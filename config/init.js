"use strict"
let logger = require('../logger/log.js').logger('init');
let colors = require('colors');
let config = require('./config');
let express = require('express');
let cookieParser = require('cookie-parser');//如果要使用cookie，需要显式包含这个模块
let session = require('express-session');//如果要使用session，需要单独包含这个模块
//let MongoStore = require('connect-mongo')(session);//使用mongo数据库存储session信息
let RedisStore = require('connect-redis')(session);
let sqlclient = require('./sqlclient');
let redisOption = config.redisoption;
let AntiLeech = require('express-anti-leech');
let thumbnail = require('../utils/thumbnail');//缩略图处理
let redis = require('redis')
let methodOverride = require('method-override');
let compress = require('compression');
let responseTime = require('response-time')
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');
let favicon = require('serve-favicon');
let wx_config = require('./wx_config');
let fs = require('fs');
let timer = require('../utils/timer');//定时任务
let path = require('path');
let crossdomin = require('../utils/crossdomin');//跨域JS
let interceptor = require('../interceptor/interceptor');//拦截器
let errno = require('../function/funcNoConfig');
let response = require('../utils/response');//包装的response
let multer  = require('multer');//文件上传
let wechat = require('wechat');
let wechatHelper = require('../wechat/wechat');//微信实现类
let nodemailer = require('../utils/nodemailer');//邮件服务
let redisUtils = require('../utils/redisUtils');//redis数据库操作类
//let jwt = require('jwt-simple');
let jwt = require('jsonwebtoken');
let jwtauth = require('../utils/jwtauth.js');//jwt校验
let api_config = require('../config/api_config');
let moment = require('moment');//日期处理
let quickSort = require('../utils/quickSort');
let routes = require('../routes/index');//路由
let crytoUtils = require('../utils/cryptoUtils');

//console.log(crytoUtils.encryptRsa('thinkive'));
let redisCli = (sourceId,prefix) => {
	sourceId = sourceId || 'local';
	return sqlclient.redisCliSingle(sourceId,prefix);
};
redisCli = redisCli('local','key:');

let init = (app) => {    
	app.use(bodyParser.urlencoded({extended: true }));
    //初始化功能号拦截器
	interceptor.init(app);
	//初始化定时任务,每天9,21定时发送邮件
	timer.init(function(){
		nodemailer.sendMail();
	});	
	//同步OA数据
	timer.wechatGetUserInfo(function(){
		wechatHelper.wxSynchUserInfo();
	});     	   	
	app.use(compress());//压缩中间件gzip
	app.use(responseTime());//客户端请求显示X-Response-Time
	app.use(bodyParser.json({limit: '1mb'}));// use body parser so we can get info from POST and/or URL parameters
	app.use(methodOverride());
	app.use(cookieParser(config.web.session_cookie_secret));//参数为加密的秘钥    
	//方式一：内存方式：下面使用express-session自带缓存session,存储一些小于4KB，且非敏感的信息
	//app.use(session({secret: config.web.session_cookie_secret, resave: true,saveUninitialized: true,cookie:{ expires:         new Date(Date.now() + config.web.session_timeOut),   maxAge: config.web.session_timeOut}}));//maxAge服务器超时时间强制“未初始化”的会话保存到存储。一个会话未初始化的时候是新的,但不能修改。这对于实现登陆会话很有用，减少服务器存储的使用,或者服从一种在设置cookie之间的请求规则。。(默认值是true)我的理解是resave：假设每次登陆，就算会话存在也重新保存一次。saveUninitialized ：强制保存未初始化的会话到存储器
	 
	 //方式二：redis数据库模式
    app.use(session({
	    store: new RedisStore(redisOption['local']),//默认
	   // store:redisCli,
	    secret: config.web.session_cookie_secret,
	    key:'express.sid',
	    resave: false,
	    rolling: true,  //必须要，否则后面设置expires无效，且超时时间不会随着请求自动更新超时时间
	    saveUninitialized: true,
	    cookie:{expires:new Date(Date.now() + config.web.session_timeOut),key:'express.sid',maxAge: config.web.session_timeOut}//cookie的key为浏览器cookie显示的key
	}));
	
   //方式三使用mongo数据库作为session的存储
//	app.use(session({
//	    store:new MongoStore(config.mongooption),
//      secret: config.web.session_cookie_secret,
//	    resave: false,
//	    saveUninitialized: true,
//		rolling: true, 
//	    cookie:{expires: new Date(Date.now() + config.web.session_timeOut),   maxAge: config.web.session_timeOut}
//	}));

    
  //跨域中间件(ajax跨域非常管用)
	app.use(function(req, res, next) {
		crossdomin.execute(req,res);
		next();
	});	
	
	//防盗链-nginx已经处理了
	/*app.use(AntiLeech({
		  allow: config.hosts,
		  exts: config.exts,
		  log: function(source,from){
			logger.error(from+' ip address want to get source''+source +'' is blocked');
		  },
		  default: config.pictrue
	}));*/
	
	//jwt,json web token请求认证	http://115.29.145.75:8080/authorization?appid=122222222	
	app.all('/authorization', function(req, res, next) {		
		let expires = moment().add(5, 'm').valueOf();
		let appid = (req.body && req.body.appid) || (req.query && req.query.appid);
		if(!appid)
		{
			let resultVo = {};
			resultVo.error_no = errno.errno0009;
			resultVo.error_info = '申请授权文件，必须提供平台appid';
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
			res.end(JSON.stringify(resultVo));
			return;
		}
		//校验appid合法性，如果不合法
		if(false)
		{
				resultVo.error_no = errno.errno0009;
				resultVo.error_info = '未注册平台信息appid';
				res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
				res.end(JSON.stringify(resultVo));
		}
		
		let appResult = {'userid':1212,'name':'mayc'};//通过appid获取的账号相关信息
		
		/** jwt-simple
		logger.info(expires);
		let token = jwt.encode({
		  	appid: appid,
		  	exp:expires
		}, app.get('jwtTokenSecret'));*/
		 
		//先在redis数据库里面获取如果存在，则返回，不存在则重新生成
		redisUtils.get('access-token:'+appid,function(err, reply){			
			let token = '';
			if(!reply)//不存在
			{
				token = jwt.sign({'name':appid}, app.get('jwtTokenSecret'), {  expiresInMinutes: api_config.expires  });
		        redisUtils.setex('access-token:'+appid,token,4.9*60);//存储在redis数据库
			}else
			{
				token = reply;
			}					
	        res.json({
				token : token,
				expires: expires,//config.web.session_timeOut
			});
		});
				
	});
	
	//授权http://115.29.145.75:8080/api?access_token=eyJ0eX
	app.all('/api', function(req, res,next){
	 	jwtauth(app,req, res,next);
	});	
		
	//微信服务
	app.post('/wechat', wechat(wx_config.mp,wechat.text(function(info,req, res, next) {
		wechatHelper.execute(info,req, res, next);	
	})));
	app.get('/wechat', wechat(wx_config.mp, wechat.text(function(info,req, res, next) {
		wechatHelper.execute(inforeq, res, next);	
	})));

	//消息队列('chat频道')
	getRedisData();
	
	//配合multer,防止恶意上传
	function addPermissionChecking(handler) {
		return function(req, res, next) {
			// 假设用户信息保存在req.currentUser中,真实环境需要控制这里去掉！
			if (!req.currentUser) {
				handler.apply(this, arguments);
			} else {
				next('权限不足');
			}
		};
    }	
	//请求超时中间件
	app.use(function (req, res,next) {
		if(req.url == config.dataReqUrl || req.url.indexOf('funcNo=') > 0)//请求的数据接口post
		{
			response.execute(res);
		}else//通过模板
		{
			response.executeTemplete(res);
		}	
		/*//如果是非 模板直接
		//let urls = (app.get('public')+'/HTML5'+url);
        //response.executeHtml(res,req,urls);			
		*/			
		res.setTimeout(config.timeout,function(){
			try{
				resultVo.results = {};
				resultVo.error_no = errno.errno0001;
				resultVo.error_info = '请求数据超时!';
				res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
				res.end(JSON.stringify(resultVo));
			}
			catch(e){
				logger.error('请求超时异常!');
			}
		});
		next();
    });
    
    app.use(errorHandler());
	app.use(express.static(process.cwd() + '/public'));//设置后才能访问静态页面
	app.use(favicon(process.cwd() + '/public/images/favicon.ico'));//设置favicon图标，修改后需要清理缓存
		
	//拦截器中间件
    app.use(function(req, res,next) { 
	    if(req.url == config.dataReqUrl || req.url.indexOf('funcNo=') > 0)//请求的数据接口post
	    {
	  	    interceptor.execute(app,req,res,next);
	    }
	    else//访问普通页面
	    {
	   		next();
	    }
	});
    app.use('/', routes);//路由模式
}
function getRedisData() {
    //客户端连接redis成功后执行回调
    redisCli.on('ready', function () {
        //订阅消息
        redisCli.subscribe('chat');
       
    });
 
    redisCli.on('error', function (error) {
        logger.info('Redis Error ' + error);
    });
 
    //监听订阅成功事件
    redisCli.on('subscribe', function (channel, count) {
        logger.info('订阅【'+channel+'】通道成功。。。');
    });
 
    //收到消息后执行回调，message是redis发布的消息
    redisCli.on('message', function (channel, message) {
		//进行具体业务处理
        dealWithMsg(message);
    });
 
    //监听取消订阅事件
    redisCli.on('unsubscribe', function (channel, count) {
        logger.info('client unsubscribed from' + channel + ', ' + count + ' total subscriptions')
    });
}
 
function dealWithMsg(message) {
    //按照message查询内容
    redisUtils.zscore('chat:z', message, function (reply) {
        logger.info(message + '队列获取数据：' +reply);
    },'1');
}
exports.initApp = init;
