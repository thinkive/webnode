"use strict"
let logger = require('../logger/log').logger("thumbnail");
let gm = require('gm');//缩略图处理 
let imageMagick = gm.subClass({imageMagick: true });
/*
 * @name生成缩略图文件名
 */
let execute = (name) => {
	try{
	    imageMagick('./uploads/images/'+name)
	    .resize(150, 150, '!')
	    .autoOrient()
	    .write('./uploads/thumbnail/'+name, function(err){
			if (err) {  
				logger.error(err);  
			}else
			{
				//更新数据库
			}
	   }
       );  
	}catch(e){
		//TODO handle the exception
	}

};	
let thumbnail = {
	"execute":execute
};
module.exports = thumbnail;
 
