"use strict"
let logger = require('../logger/log').logger("timer");
let later = require('later');//定时任务
let wx_config = require('../config/wx_config');
let oaserviceInner = require('../services/oaserviceInner');
/*
 * 定时任务
 // 每个月的第一天每两小时执行一次
// and 每个月的最后一天的8:00am和8:00pm
// except 12月
  let sched = later.parse.recur()
                .every(2).hour().first().dayOfMonth()
              .and()
                .on(8,20).hour().last().dayOfMonth()
              .except()
                .on(12).month();

  // 获取后10个有效发生
  later.schedule(sched).next(10);
 */
let init = (callback) => {
	try{
	  /*let sched = later.parse.recur().every(5).second(),
        t = later.setTimeout(function() {
        logger.info("每隔5秒");
    }, sched);*/
		
   //设置later.date.UTC();//default
   //设置本地时区
	later.date.localTime();
	//let sched = later.schedule(schedules);//无效了
	//let sched = later.parse.recur().on(9,10,11).hour();//每天8点和17点.and()和或者
	//let sched = later.parse.recur().on('11:03:30','11:04:20','11:05:50').time();//排除5月份.except().on(5).month();
	//onWeekend(): 周末，等价于on(1,7).dayOfWeek(),每2秒.every(2).second(),
    //onWeekday(): 工作日，等价于on(2,3,4,5,6).dayOfWeek() second();
	/*minute();
	hour();
	time();
	dayOfWeek();
	dayOfWeekCount();
	dayOfMonth();
	dayOfYear();
	weekOfMonth();
	weekOfYear();
	month();
	year();
	*/
	let sched = later.parse.recur().on(3).dayOfWeek().on(18).hour().on(30).minute();//每周1的18点半
	//let sched = later.parse.recur().onWeekday().on(15).hour();//每周2的16点
	//let sched = later.parse.recur().on(18,22).hour();//早上9点和晚上9点发送邮件
	//let sched = later.parse.recur().on(18).hour().on(24).minute();//每天18:25
	later.setInterval(function() {
		if(callback)
		{
			callback();
		}        
    }, sched);
	}catch(e){
		logger.info(e.message);
		//TODO handle the exception
	}

};	

/*
 * 微信定时生成ACCESS_TOKEN
 */
let wechatToken = (callback) => {
	try{
	   //设置later.date.UTC();//default
	   //设置本地时区
		later.date.localTime();
		let sched = later.parse.recur().every(wx_config.accessTokenTimeOut).hour();//腾讯官方7200秒(2小时),这里要低于2小时,不能用second(),every最大微60.
		later.setInterval(function() {
			if(callback)
		    {
			  	callback();
		  	}
        
        }, sched);
	}catch(e){
		logger.info(e.message);
		//TODO handle the exception
	}

};	

/**
定时同步微信用户个人信息数据,每天晚上12点同步
*/
let wechatGetUserInfo = (callback) => {
	try{
   //设置later.date.UTC();//default
   //设置本地时区
	later.date.localTime();
	let sched = later.parse.recur().on(3).hour();//每天凌晨2点更新微信用户个人信息
	//let sched = later.parse.recur().every(60).second();
	later.setInterval(function() {
		if(callback)
		{
			callback();
		}        
    }, sched);
	}catch(e){
		logger.info(e.message);
		//TODO handle the exception
	}
}

/**
定时同步用户列表数据
*/
let wechatGetUserList = (callback) => {
	try{
   //设置later.date.UTC();//default
   //设置本地时区
	later.date.localTime();
	let sched = later.parse.recur().on(2).hour();//每天凌晨2点更新微信用户个人信息
	//let sched = later.parse.recur().every(60).second();
	later.setInterval(function() {
		if(callback)
		{
			callback();
		}        
    }, sched);
	}catch(e){
		logger.info(e.message);
		//TODO handle the exception
	}
}

/**
定时同步OA数据(用户名),每天一点同步数据
*/
let synchOaUserInfo = () =>{
	//查询原始数据密码和用户信息
	let callback = function(resultVo){
		if(resultVo.error_no == 0)
		{
			logger.info("同步OA个人信息数据成功");	
		}else
		{
			logger.info("同步OA个人信息数据失败");		 	
		}
	}
	later.date.localTime();
	let sched = later.parse.recur().on(1).hour();
	later.setInterval(function() {
		oaserviceInner.getUserPsw(callback);//同步密码部分
		oaserviceInner.getUserInfo(callback);//同步个人信息
	}, sched);
}


let timer = {
	'init':init,
	'wechatToken': wechatToken,
	'wechatGetUserInfo': wechatGetUserInfo,
	'wechatGetUserList': wechatGetUserList,
	'synchOaUserInfo': synchOaUserInfo
};
module.exports = timer;
 
