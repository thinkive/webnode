"use strict"
var getClientIp= (req) => {
	var ip = req.headers['x-forwarded-for'] || 
		req.connection.remoteAddress || 
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;	
	return ip;
}


var os = {
	getClientIp:getClientIp,
	
}
module.exports = os;