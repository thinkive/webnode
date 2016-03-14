"use strict"
let logger = require('../logger/log.js').logger("function000006");
let baseFunction = require("./baseFunction");
let errno = require('../function/funcNoConfig');
let oaservice = require('../services/oaservice');
let xlsx = require('node-xlsx');
let fs = require('fs');
let objNewData = [["项目编号","预计时间",'预计验收时间']];
let async = require("async");  
let title = "" ;
 
class function000006 extends baseFunction
{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){		
		title = this.param.time;
		let path = '/uploads/images/'+title+'.xlsx';
		let obj = xlsx.parse(process.cwd()+path); 
		let data = obj[0].data;
		async.eachSeries(data, function(item,cb){	
			parseEquipmentList(item,title,cb);
		});	  
		//业务模块通常要捕获异常
		oaserviceInner.test(callback);

	}
	parseEquipmentList(param,title,cb){
		//回调方法
		let callback = function(result){
			if(result.length > 0)
			{
				this.resultVo.error_no = "0"
				this.resultVo.error_info = "统计工时信息成功!";
				this.resultVo.results = result;
			}else
			{
				this.resultVo.error_no = errno.errno0006;
				this.resultVo.error_info = "统计工时清单信息!";		 	
			}
			objNewData.push(result);		
			let buffer = xlsx.build([{name: "sheel", data: objNewData}]);
			fs.writeFileSync("public/HTML5/execl/huyang/"+title+"1.xlsx", buffer, 'binary');
			cb();
		}
		//业务处理
		oaservice.getProjectByEndComDate(param,title,callback);
    }
} 


module.exports = {
	"execute" : function(req,res,param){
		new function000006(req,res,param).execute();
	}
};