"use strict"
let logger = require('../logger/log.js').logger("function000105");
let baseFunction = require("./baseFunction");
let errno = require('../function/funcNoConfig');
let oaservice = require('../services/oaservice');
let xlsx = require('node-xlsx');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));
let request = promise.promisifyAll(require("request"));
/*
 * 使用promise来替换async方法
 FS不会返回promise。
尽管如此，bluebird提供了一个非常有用的功能来promise化不返回promise的模块。
比如，promise化fs模块，只需要简单地require bluebird模块和一个被promise化的fs模块。

创建你自己的Promise

因为你可以promise化模块，所以你不会需要写很多的代码来创建promise。然后，即使如此知道如何创建也是很必要的。创建promise需要提供resolve和reject的回调方法。每一个都需要传对了：

//myPromise.js

let Promise = require('bluebird');

module.exports = function(){
    return new Promise(function(resolve, reject){
        tradiationCallbackBasedThing(function(error, data){
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    });
}
这样就完成了promise化。接下来，你就可以使用这个技术把你想要promise化的都写成promise的形式。
 **/

class function000105 extends baseFunction
{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){		
		//业务处理开始(异步了)
		//定义回调(必须使用箭头函数才能获取到resultVo)
		let callback  = (result) =>{
			this.resultVo.error_no = "0";
			this.resultVo.error_info = '返回信息成功';
			this.resultVo.results = result;
			this.response();	
		}
		fs.readFileAsync('directory/file-to-read')
			.then(function(fileData){
				return fs.mkdirAsync('directory/new-directory');
			})
			.then(function(){
				return fs.writeFileAsync('directory/new-directory/message.txt');
			})
			.catch(function(error){
				throw this.exception('异常代码','promise循环内部异常描述')
        });
	}
}


module.exports = {
	"execute" : function(req,res,param){
		new function000105(req,res,param).execute();
	}
};