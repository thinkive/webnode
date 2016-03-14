"use strict"
/**
发送手机短信
*/
let config = require('../config/config');
let baseFunction = require('../function/baseFunction');
//let App = require('alidayu-node');
//let app = new App(config.bigFishKey, config.bigFishSecret);
let aliDaYu = require('alidayu-node-sdk');//ES6
var app = new aliDaYu(config.bigFishKey, config.bigFishSecret);
let sendMobileMessage = (phoneNo,workd,callback) => {
    let resultVo = baseFunction.getResultVO();	
    let randomCode = '1812';//必须是字符串不能是1812
	let options = {
		 sms_free_sign_name: '微云信息',
		 sms_param: {"code":randomCode,"product":"微客服超级会员"},
		 rec_num: '13926530028', //手机号多个以逗号间隔,一次最多200个
		 sms_template_code: 'SMS_5037753'
	}
    
	/*ES5
	app.smsSend(options,(result) => {
        if(result.error_response)//失败
        {		
			resultVo.error_no = result.error_response.code ;
            resultVo.error_info = result.sub_msg+result.sub_code;
        }else{
			let results = result.alibaba_aliqin_fc_sms_num_send_response;
			if(results && results.err_code == '0'){
				resultVo.error_no = results.err_code;
                resultVo.error_info = results.success;
			}
		}		
		callback(resultVo);
	});*/
	
	app.smsSend({
		 sms_free_sign_name: '微云信息',
		 sms_param: {"code":randomCode,"product":"微客服超级会员"},
		 rec_num: '13926530028', //手机号多个以逗号间隔,一次最多200个
		 sms_template_code: 'SMS_5037753'
    }).then(function(result){
        if(result.error_response)//失败
        {		
			resultVo.error_no = result.error_response.code ;
            resultVo.error_info = result.sub_msg+result.sub_code;
        }else{
			let results = result.alibaba_aliqin_fc_sms_num_send_response;
			if(results && results.err_code == '0'){
				resultVo.error_no = results.err_code;
                resultVo.error_info = results.success;
			}
		}		
		callback(resultVo);
    });
	
	
}
let mobileMessage = {
	sendMobileMessage:sendMobileMessage
};

module.exports = mobileMessage;