"use strict"
let logger = require('../logger/log').logger('jwtauth');
let errno = require('../function/funcNoConfig.js');
//let jwt = require('jwt-simple');
let jwt = require('jsonwebtoken');
module.exports = (app,req, res, next)  => {
 	let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	if (token) {
	    try {
			/*
			let decoded = jwt.decode(token, app.get('jwtTokenSecret'));	
			logger.info('时间：~~~~~~~~~~~'+(Date.now()-decoded.exp)/1000);
			if (decoded.exp <= Date.now()) {
				  res.end('Access token has expired', 400);
				}
				*/
			jwt.verify(token, app.get('jwtTokenSecret'), function(err, decoded) {      
				if (err) {
					let resultVo = {};
					resultVo.error_info = 'Failed to authenticate token!';
					resultVo.error_no = errno.errno0008;
					res.send(JSON.stringify(resultVo));
				} else {
					req.decoded = decoded;
					resultVo.error_info = 'success to authenticate token!';
					resultVo.error_no = errno.errno0008;
					res.send(JSON.stringify(resultVo));
				//next();
				}
			});      
		} catch (err) {
			next();
		}
	} else {
		next();
	}
};
 
