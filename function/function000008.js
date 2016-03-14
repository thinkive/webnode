"use strict"
let logger = require('../logger/log.js').logger("function000008");
let baseFunction = require('./baseFunction');
let errno = require('../function/funcNoConfig');
let app = require('../config/app');
let superagent = require("superagent");
let request = require('request');
let cheerio = require("cheerio");

/**
爬虫使用request
*/
let URL_36KR = 'http://36kr.com/';  //36氪 
let execute2 = function(param,res,req){
	res.send("request  cheerio");
	dataCollectorStartup();
};

/* 开启数据采集器 */
function dataCollectorStartup() {         
    dataRequest(URL_36KR);
 }
 //定义代理地址
let PROXY_LIST = [{"ip":"111.1.55.136","port":"55336"},{"ip":"111.1.54.91","port":"55336"},{"ip":"111.1.56.19","port":"55336"}
                    ,{"ip":"112.114.63.16","port":"55336"},{"ip":"106.58.63.83","port":"55336"},{"ip":"119.188.133.54","port":"55336"}
                    ,{"ip":"106.58.63.84","port":"55336"},{"ip":"183.95.132.171","port":"55336"},{"ip":"11.12.14.9","port":"55336"}
                    ,{"ip":"60.164.223.16","port":"55336"},{"ip":"117.185.13.87","port":"8080"},{"ip":"112.114.63.20","port":"55336"}
                    ,{"ip":"188.134.19.102","port":"3129"},{"ip":"106.58.63.80","port":"55336"},{"ip":"60.164.223.20","port":"55336"}
                    ,{"ip":"106.58.63.78","port":"55336"},{"ip":"112.114.63.23","port":"55336"},{"ip":"112.114.63.30","port":"55336"}
                    ,{"ip":"60.164.223.14","port":"55336"},{"ip":"190.202.82.234","port":"3128"},{"ip":"60.164.223.15","port":"55336"}
                    ,{"ip":"60.164.223.5","port":"55336"},{"ip":"221.204.9.28","port":"55336"},{"ip":"60.164.223.2","port":"55336"}
                    ,{"ip":"139.214.113.84","port":"55336"} ,{"ip":"112.25.49.14","port":"55336"},{"ip":"221.204.9.19","port":"55336"}
                    ,{"ip":"221.204.9.39","port":"55336"},{"ip":"113.207.57.18","port":"55336"} ,{"ip":"112.25.62.15","port":"55336"}
                    ,{"ip":"60.5.255.143","port":"55336"},{"ip":"221.204.9.18","port":"55336"},{"ip":"60.5.255.145","port":"55336"}
                    ,{"ip":"221.204.9.16","port":"55336"},{"ip":"183.232.82.132","port":"55336"},{"ip":"113.207.62.78","port":"55336"}
                    ,{"ip":"60.5.255.144","port":"55336"} ,{"ip":"60.5.255.141","port":"55336"},{"ip":"221.204.9.23","port":"55336"}
                    ,{"ip":"157.122.96.50","port":"55336"},{"ip":"218.61.39.41","port":"55336"} ,{"ip":"221.204.9.26","port":"55336"}
                    ,{"ip":"112.112.43.213","port":"55336"},{"ip":"60.5.255.138","port":"55336"},{"ip":"60.5.255.133","port":"55336"} 
                    ,{"ip":"221.204.9.25","port":"55336"},{"ip":"111.161.35.56","port":"55336"},{"ip":"111.161.35.49","port":"55336"}
                    ,{"ip":"183.129.134.226","port":"8080"} ,{"ip":"58.220.10.86","port":"80"},{"ip":"183.87.117.44","port":"80"}
                    ,{"ip":"211.23.19.130","port":"80"},{"ip":"61.234.249.107","port":"8118"},{"ip":"200.20.168.140","port":"80"}
                    ,{"ip":"111.1.46.176","port":"55336"},{"ip":"120.203.158.149","port":"8118"},{"ip":"70.39.189.6","port":"9090"} 
                    ,{"ip":"210.6.237.191","port":"3128"},{"ip":"122.155.195.26","port":"8080"}];
        

function getProxy() {        
    let randomNum = parseInt(Math.floor(Math.random() * PROXY_LIST.length));    
    let proxy = PROXY_LIST[randomNum];
    return 'http://' + proxy.ip + ':' + proxy.port;
}
/* 数据请求 */
function dataRequest(dataUrl){
    request({
        url: dataUrl,    
		proxy: getProxy(),//使用代理
		//如果地址是https，需要增加自定义headers
		headers: {
            'User-Agent': 'request'
            },
        method: 'GET'
    }, function(err, res, body) { 
        if (err) {            
            console.log(dataUrl)
            console.error('[ERROR]Collection' + err);        
            return;            
        }

        switch(dataUrl)
        {
            case URL_36KR: dataParse36Kr(body); break;        
        }

        
    });    
}

/* 36kr 数据解析 */
function dataParse36Kr(body){
    console.log('============================================================================================');
    console.log('======================================36kr==================================================');
    console.log('============================================================================================');    

    let $ = cheerio.load(body);
        
    let articles = $('article')

    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        let descDoms = $(article).find('.desc');

        if(descDoms.length == 0)
        {
            continue;
        }
        
        let coverDom = $(article).children().first();
        let titleDom = $(descDoms).find('.info_flow_news_title');
        let timeDom = $(descDoms).find('.timeago');

        let titleVal =  titleDom.text();
        let urlVal = titleDom.attr('href');
        let timeVal = timeDom.attr('title');
        let coverUrl = coverDom.attr('data-lazyload');

        //处理时间
        let timeDateSecs = new Date(timeVal).getTime() / 1000;

        if(urlVal != undefined)
        {
            console.info('--------------------------------');
            console.info('标题：' + titleVal);
            console.info('地址：' + urlVal);
            console.info('时间：' + timeDateSecs);
            console.info('封面：' + coverUrl);                
            console.info('--------------------------------');
        }
    };
}

/**
爬虫使用superagent
*/
class function000008 extends baseFunction{
	constructor(req,res,param) {
    	//直接调用父类构造器进行初始化
        super(req,res,param);
    }
	execute(){		
		// 用 superagent 去抓取 https://cnodejs.org/ 的内容
		
		let callback =(err, sres)=>{
				// 常规的错误处理
				if (err) {
					return next(err);
				}
				// sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
				// 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
				// 剩下就都是 jquery 的内容了
				let $ = cheerio.load(sres.text);
				let items = [];
				$('#topic_list .topic_title').each(function (idx, element) {
					let $element = $(element);
					items.push({
					  title: $element.attr('title'),
					  href: $element.attr('href')
					});
				});
				this.res.send(items);
		  
		}
		
		superagent.get('https://cnodejs.org/').end(callback);
	}
}
module.exports = {
	"execute" : function(req,res,param){
		new function000008(req,res,param).execute();
	}
};