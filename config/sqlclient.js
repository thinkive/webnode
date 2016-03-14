"use strict"
let logger = require('../logger/log.js').logger("init");
let config = require('./config');
let crytoUtils = require("../utils/cryptoUtils");//解密
let clientMysql = require('mysql');
let clientRedis = require("redis");
let redisCli = {};
let async = require("async");  
let clientPool = [];
let handleMysql = (client,desc,index) =>  {  
   var promise = new Promise(function(resolve, reject){    
		//这种方式连接一段时间会断掉                                 
		client.getConnection(function(err,connect) {              
			if(err) {                   
				resolve(desc+"连接失败" + new Date());
			    
			}else
			{
				clientPool[index] = client;
				resolve(desc+"连接成功!");
				//console.log(desc+"连接成功!")
				return ('desc+"连接成功!')
				
			}			
		});                                                                           
		client.on('error', function(err) { 
			reject('db error', err);
			if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
				//handleMysql(client,desc);                         
			} else {                                      
				throw err;                                 
			}
	    });
      
  
    });
	return promise;
};

let handleRedisDisconnect = (client,obj,key) =>  {
    
	 //默认验证本地的redis服务器
	client.auth(obj.pass,function(){
		logger.info(obj.desc+"认证成功!");  
	});
	client.on("error", function(err){
		logger.error(obj.desc+"断线重连" + new Date());  
	   setTimeout(function(){
			handleRedisDisconnect(client,obj);
		}, 5000);
	});                                      
	client.on("connect", function(){
		logger.info(obj.desc+"连接成功!!");  
	});
	client.on("ready", function(){
		logger.info(obj.desc+"ready完成!");  
	});	   
	
};

let initSource = () => {	
	/*mysql初始化
	let(let key  in config.mysqloption)
	{
		let obj = config.mysqloption[key];
		obj.password = crytoUtils.decryptRsa(obj.password);
		let initCli = clientMysql.createPool(obj);
		handleMysql(initCli,obj.desc);	
	}*/	
    
	//mysql采用同步队列执行
	/*async.eachSeries(config.mysqloption, function(item,cb){	
		item.password = crytoUtils.decryptRsa(item.password);
		let initCli = clientMysql.createPool(item);
		handleMysql(initCli,item.desc,cb);
	});	*/

	
	//ES6模式 var p = Promise.all(array);
	let promises = config.mysqloption.map(function(item,index){
	   item.password = crytoUtils.decryptRsa(item.password);
	   let initCli = clientMysql.createPool(item);
	   return handleMysql(initCli,item.desc,index);
	});	
	Promise.all(promises).then(function(posts) {
	    console.log(posts)
	}).catch(function(reason){
	    console.log('异常了')
	});	
	
	//redis初始化
    for(let key  in config.redisoption)
	{
		let obj = config.redisoption[key];
		obj.pass = crytoUtils.decryptRsa(obj.pass);
		let initCli = clientRedis.createClient(obj);//必须首先初始化，然后接着auth验证，否则会提示错误	       	
		redisCli[key] = initCli;
		handleRedisDisconnect(initCli,obj,key);
	}		
	

};

initSource();

let mysqlCli = (sourceId) => {
	sourceId = sourceId || 0;	
	return clientPool[sourceId]//单例
};


let sqlclient = {
	mysqlCli: mysqlCli,
	redisCli: redisCli,
};

module.exports = sqlclient;