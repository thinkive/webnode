"use strict"
let moment = require('moment');
// let day = moment(1429711896);
// let now = moment().format('YYYY-MM-DD HH:mm:ss'); 
 //moment().format('d');//返回星期几
 //moment().add('days',7).format('YYYY年MM月DD日');7天后
 //moment().add('hours',9).format('HH:mm:ss');9小时候
/**
将时间戳转换微具体格式的时间格式
*/
let timestaml = (timestaml,format) => {	
	let CreateTime = new Date(parseInt(timestaml) * 1000);
	return (moment(CreateTime).format(format));
}

/**
当前系统日期和时间
*/
let currDateTime = () => {
	let now = moment().format('YYYY-MM-DD HH:mm:ss'); 
	return now;
}
let dateUtils = {
	timestaml:timestaml,
	currDateTime:currDateTime
};
module.exports = dateUtils;