/**
具体业务模块服务层
*/
"use strict"
let logger = require('../logger/log.js').logger("oaserviceInner");
let baseService = require('./baseService');

class oaserviceInner extends baseService{
	constructor() {
    	//直接调用父类构造器进行初始化
        super();
    }
    //测试调用mysql数据库服务器
	test(callback){
		let sql = "select HREMP_EMPID,HREMP_NAME,HREMP_GENDER,HREMP_IDCARD,HREMP_STATUS,HREMP_EMAIL,HREMP_ADDRH1,HREMP_ORG,HREMP_FAXNOC from HREMP";	  
		try{
			this.getMysqlClient(1).getConnection(function(err, connection) {
				if(!connection)
				{
					logger.error('数据库连接失败'+err);
					throw this.exception('00001','数据库连接失败'+err);
					return;
				}
				connection.query(sql,function(err,result){
					if(err) {
						connection.destroy();
						logger.error("query Error: "+ sql +err.message);
						throw this.exception('00001','数据库连接失败'+err);
						return;
					}
					callback(result);
					connection.release(); //一定要释放
				}); 
			});
		}catch(e){
			logger.error(e.message);
			throw this.exception('00002','数据库连接失败');
		}

	}
}

let oaservice = new oaserviceInner();
module.exports = oaservice;