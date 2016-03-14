"use strict"
let logger = require('../logger/log').logger('antiLeech');
let AntiLeech = require('express-anti-leech');
// 白名单 { 域名：[ ip, ...] }
let hosts = ['127.0.0.1:80', 'localhost:80','www.html5plat.com'];
 
// 反盗链类型
let exts = ['.png', '.jpg', '.jpeg', '.gif', '.swf', '.flv'];
 
// 盗链默认指向图片
let pictrue = '/images/antiLeech.jpg';
 

let execute = function(){
	AntiLeech({
    	allow: hosts,
		exts: exts,
		log: console.log, // 你也可以使用自己的方法来记录
	    default: pictrue
	 });
};	
let antiLeech = {
	execute : execute
};
module.exports = antiLeech;
 
