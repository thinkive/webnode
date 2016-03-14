"use strict"
let logger = require('../logger/log.js').logger("function000005");
let errno = require('../function/funcNoConfig');
let redisUtils = require('../utils/redisUtils');
let mobileMessage = require('../utils/mobileMessage');
let baseFunction = require('./baseFunction');
/*
 * 发送短信验证码，限制同一个IP，5分钟只能发送一次
   http://115.29.145.75/servlet/json?funcNo=000005
 **/
class function000005 extends baseFunction
{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){		
		//根据IP查数据库
		redisUtils.get("ticket:"+this.req.headers['x-real-ip'],function(error, reply){
			if(error) {
				logger.error(error);
			} else {
				//redisUtils.ttl("ticket:"+req.headers['x-real-ip']);可以获得某个key过期时间
				if(reply)//数据库存在信息，表示当前IP5分钟内发送过验证码
				{
					this.resultVo.error_no = "-10";
					this.resultVo.error_info = '不能重复发送验证码';
					this.resultVo.results = result;
					this.response();
				}else
				{
					 let callback = (result) => {
						if(result)
						{
							this.resultVo.error_info = "短信发送成功!";
							redisUtils.setex("ticket:"+this.req.headers['x-real-ip'],result,5*60,function(error, reply){
								 if(error) {
									logger.error(error);
									this.resultVo.error_info = "短信发送成功,但是信息存储失败!";	
								 } else {	
										
											
								 }
							});
						}else
						{
							this.resultVo.error_info = "短信发送失败!";		 	
						}
						this.response();
					 };						 
					 mobileMessage.sendMobileMessage(this.param.phoneNo,"【微云信息】,当前验证码为1212,请妥善保管，不要泄露给其他人",callback);
								
				}	

			}
		});
	}
}


module.exports = {
	"execute" : function(req,res,param){
		new function000005(req,res,param).execute();
	}
};
