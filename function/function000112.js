"use strict"
let logger = require('../logger/log.js').logger("function000112");
let baseFunction = require("./baseFunction");
/*
 **测试generator（生成器）函数的使用
 生成器可以传递参数，但是仅限第一次使用
 生成器可以使用return语句来终止循环
 **/
class function000112 extends baseFunction
{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){			 
		var gen = this.idMaker();	
		this.resultVo.error_no = "0"
		this.resultVo.error_info = '返回信息成功';
		this.resultVo.results = gen.next().value+"|"+gen.next().value+"|"+gen.next().value;
		this.response();
	}
	*idMaker(){
		var index = 0;
		while(index<3)
		{
			yield index++;	
		}	
		
	}
}


module.exports = {
	"execute" : function(req,res,param){
		new function000112(req,res,param).execute();
	}
};