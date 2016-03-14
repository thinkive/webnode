"use strict"
let logger = require('./logger/log').logger("server");
let colors = require('colors');
let app = require('./config/app');
let path = require('path');
let http = require('http');
let routes = require('./routes');
let ejs = require('ejs');//视图模板采用ejs
// Make sure to include the JSX transpiler
require("node-jsx").install();
let config = require('./config/config');
let api_config = require('./config/api_config');
let art_template = require('art-template');
app.set('port', config.web.port);
app.set('function_path', path.join(process.cwd(), 'function'));//功能号存放位置
app.set('uploads_path', path.join(process.cwd(), 'uploads'));//存放上传文件位置
app.set('interceptorPath', path.join(process.cwd(), 'interceptor'));//拦截器配置文件存放位置
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.engine('.html', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.set('routes', path.join(process.cwd(), 'routes'));
app.set('public', path.join(process.cwd(), 'public'));
app.set('jwtTokenSecret', api_config.token_secret);
require("./config/init").initApp(app);
//或者
let server = http.createServer(app).listen(config.web.port, function(){	
     //使用node启动的时候会显示带颜色的提示colors.green(('端口监听1：' + config.web.port).green)
   	logger.info('端口监听：' + config.web.port);
});//或者app.listen(3000);

//如果是https
/*let https = require('https');
let cert = fs.readFileSync(app.get("ssl")+'/server.crt');
let key = fs.readFileSync(app.get("ssl")+'/server.key')
let https_options = {
    key: key,
    cert: cert,
    passphrase:"217891qqqq"
};
let server = https.createServer(https_options,app).listen(config.sslport, function(){	
	console.log(colors.green(('端口监听：' + config.sslport).green));
});//或者app.listen(3000);*/


