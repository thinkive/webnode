"use strict"
let logger = require('../logger/log.js').logger("function000113");
let baseFunction = require("./baseFunction");
/*
 **异常处理
 **/
 class function000113 extends baseFunction
{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){		
		let i = 0;
		i++;
		this.resultVo.error_no = "0"
		this.resultVo.error_info = '返回信息成功';
		this.resultVo.results = i;
		throw this.exception('异常代码','异常描述')
	}
}



module.exports = {
	"execute" : function(req,res,param){
		new "function000113"(req,res,param).execute();
	}
};