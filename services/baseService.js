//基类服务层
"use strict"
let logger = require('../logger/log.js').logger("baseFunction");
let config = require('../config/config');
let sqlClient = require('../config/sqlclient');//mysql
class baseService {
	//构造方法
	constructor(){
     
	}
	//获取数据库连接(mysql,0为C数据库，1为A数据库，2B数据库)
	getMysqlClient(db) {
		return sqlClient.mysqlCli(db);
    }
	//获取数据库连接(redis)
	getRedisClient(sourceId) {
		return sqlClient.redisCli[sourceId]
    }
	exception(value,message) {
		let obj = {};
		obj.value = value;
        obj.message = message;	
        return obj;
    }
    /*	
	response(){
		console.log(this.param);
		if (this.param && this.param.callback && config.isJsonp == "1") {
			let str =  this.param.callback + '(' + JSON.stringify(this.resultVo) + ')';//jsonp
			this.res.end(str);
		}else {
			this.res.send(this.resultVo);//普通的json
		} 
	}*/
	//具体业务处理
	execute(){
		
	}
	
}

module.exports = baseService;