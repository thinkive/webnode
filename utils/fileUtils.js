"use strict"
let fs = require('fs');
let logger = require('../logger/log.js').logger('fileUitls');

let readFile = (url,callback) => {
	fs.readFile(url,callback);
}

let fileUitls = {
	readFile:readFile
};

module.exports = fileUitls;