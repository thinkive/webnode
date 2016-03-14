"use strict"
let logger = require('../logger/log.js').logger("baseFunction");
let config = require('../config/config');
let sqlclient = require('../config/sqlclient');//mysql
class baseFunction {
	constructor(req,res,param){
		this.req = req;
		this.res = res;
		this.param = param;
		this.results = {};
		this.error_no = "0";
		this.error_info = "操作成功";
        this.resultVo = {
			results : this.results,
			error_no : this.error_no,
			error_info : this.error_info
		};
	}
	//mysql数据库连接
	getMysqlClient(db) {
		return sqlclient.mysqlCli(db);
    }
	//redis数据库连接
	getRedisClient(sourceId) {
		return sqlClient.redisCli[sourceId]
    }
	//返回数据
	response(){
		if (this.param && this.param.callback && config.isJsonp == "1") {
			let str =  this.param.callback + '(' + JSON.stringify(this.resultVo) + ')';//jsonp
			this.res.end(str);
		}else {
			this.res.send(this.resultVo);//普通的json
		} 
	}
	//异常处理
	exception(){
		let obj = {};
		obj.value = value;
        obj.message = message;	
        return obj;
	}
	//业务处理
	execute(){
		
	}
	
}

/**
 * @param sql SQL查询语句
 * @param param 查询条件参数
 * 查询类业务
 * */
let query  = (sql,param,res,callback) => {
	let resultVo = getResultVO();
	try{
		getMysqlCient().getConnection(function(err, connection) {
			if(!connection)
			{
				logger.error('数据库连接失败');
				resultVo.error_info = "数据库连接失败!";
				resultVo.error_no = "011";
				resultVo.results = {};
				callback(resultVo);
				return;
			}
			/*对于单个条件查询(id = '5') 可以使用pool.escape('5'),防止id='5 ID = 1'这种情况
				let sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
				connection.query(sql, function(err, results) {
				 
				});
				或者使用？作为占位符
				connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
				 
				});*/
			connection.query(sql,param,function(err,result){
				if(err) {
					connection.destroy();
					logger.error("query Error: "+ sql +err.message);
					return;
				}
				resultVo.results = result;
				connection.release(); //connection.release()释放链接到连接池。如果需要关闭连接并且删除，需要使用connection.destroy()
				callback(resultVo);
	        }); 
        });
	}catch(e){
		logger.info(e.message);
	}

};


module.exports = baseFunction;