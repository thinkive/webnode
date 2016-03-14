"use strict"
let logger = require('../logger/log.js').logger("function000113");
let baseFunction = require('./baseFunction');
let oaserviceInner = require('../services/oaserviceInner');
class function000114 extends baseFunction
{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){		
	
		//定义回调(必须使用箭头函数才能获取到resultVo)
		let callback  = (result) =>{
			this.resultVo.error_no = "0";
			this.resultVo.error_info = '返回信息成功';
			this.resultVo.results = result;
			this.response();	
		}
		
		//抛出异常方法
		//throw this.exception('异常代码','异常描述')
		
		//业务模块通常要捕获异常
		oaserviceInner.test(callback);
		
		//业务处理完毕
		//组装结果集(同步测试)
		this.resultVo.error_no = "0"
		this.resultVo.error_info = '返回信息成功';
		this.resultVo.results = 121;
		//返回数据
		this.response();
	}
}

module.exports = {
	"execute" : function(req,res,param){
		new function000114(req,res,param).execute();
	}
};