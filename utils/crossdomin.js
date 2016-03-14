"use strict"
let execute = (req,res) => {
	//下面为为了解决ajax
	//	['http://127.0.0.1:3333','http://127.0.0.1:2222'].map(function(domain) {
	//	  res.setHeader( 'Access-Control-Allow-Origin', domain );
	//	});//无效后面会覆盖前面http://218.17.161.51:32860测试环境
	res.setHeader('Access-Control-Allow-Origin','http://218.17.161.51:32821');//所有域访问req.headers.origin,不能使用*
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);//ajax需要设置xhrFields：{'withCredentials' : true};维持会话
 }
	
let crossdomin = {
	'execute' : execute
};
module.exports = crossdomin;