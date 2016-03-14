"use strict"
let logger = require('../logger/log').logger('nodemailer');
let fs = require("fs");
let nodemailer = require("nodemailer");
let app = require('../config/app');
//这里是初始化，需要定义发送的协议，还有你的服务邮箱，当然包括密码
let transporter = nodemailer.createTransport({
    service: '163',//QQ  //use well known service//126->QQ成功了,QQ->126,QQ->QQ
    ssl:true,
    auth: {
        user: 'thinkive@163.com',
        pass: '217891qqqqhh'
    }
});
let img = fs.readFileSync(app.get("public")+"/images/html5.jpg");//
//邮件配置
let mailOptions = {
    from: "小马哥 <thinkive@163.com>",       // 发送地址
    to: "6000329@qq.com,thinkive@126.com", // 接收列表
    cc: 'thinkive@163.com',//抄送
    bcc: '6685246@qq.com',//密送
    subject: "HTML5",                             // 邮件主题
    text: "HTML5Plat-邮箱验证成功",                          // 文本内容
    html: '<table width="700" border="0" cellpadding="0" cellspacing="0" style="font-family:'+"'Tahoma'"+',sans-serif;font-size:12px;color:#4a4a4a;">'+
    '  <tbody><tr>'+
      '  <td style="padding-bottom:15px;">'+
         ' <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:'+"'Tahoma'"+',sans-serif;font-size:12px;color:#333333;">'+
         '   <tbody><tr>'+
             ' <td height="60" valign="bottom" style="padding-bottom:10px;border-bottom:1px solid #e8e8e8;"><a href="http://www.ctrip.com" target="_blank"><img src="http://pic.c-ctrip.com/edm/myctrip/edm_logo.png" width="119" height="43" border="0"></a></td>'+
             ' <td height="60" align="right" valign="bottom" style="padding-bottom:10px;border-bottom:1px solid #e8e8e8;">国内：<span style="border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); z-index: 1; position: static;" t="7" onclick="return false;" data="1010-6666">1010-6666</span>（境内免长话费）海外：<span style="border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); z-index: 1; position: static;" t="7" onclick="return false;" data="86-21-3406-4888">86-21-3406-4888</span></td>'+
           ' </tr>'+
         ' </tbody></table>'+
      '  </td>'+
     ' </tr>'+
     ' <tr>'+
      '  <td align="left" style="padding-top:15px;">'+
       '   <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:'+"'Tahoma'"+',sans-serif;font-size:12px;color:#4a4a4a;">'+
          '  <tbody><tr>'+
              '<td valign="top" style="line-height:20px;font-size:14px;">尊敬的 <strong></strong> 先生/女士（用户thinkive）：</td>'+
            '</tr>'+
          '  <tr>'+
            '  <td style="padding-top:20px;padding-left:15px;font-size:14px;">您好！</td>'+
           ' </tr>'+
          '  <tr>'+
             ' <td style="padding-top:8px;padding-left:15px;">您的携程账号已成功绑定邮箱<span style="color:white;">[</span><strong style="color:#333;font-size:16px;vertical-align: -2px;"><a href="mailto:t****e@qq.com" target="_blank">t****e@qq.co<wbr>m</a></strong><span style="color:white;">]</span>，现在起可使用此邮箱登录携程。</td>'+
           ' </tr>'+
           ' <tr>'+
             ' <td height="50" style="font-size:0;line-height:0;"></td>'+
           ' </tr>'+
           ' <tr>'+
             ' <td>'+
               ' <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:'+"'Tahoma'"+',sans-serif;font-size:12px;color:#999999;">'+
                '  <tbody><tr>'+
                   ' <td height="22" colspan="2">此邮件由系统自动发送，请勿直接回复。</td>'+
                 ' </tr>'+
                '  <tr>'+
                  '  <td height="22" colspan="2">如有疑问，请及时联系携程：</td>'+
                 ' </tr>'+
                 ' <tr>'+
                    '<td height="22" width="165">固话：<span style="border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data="800-820-6666">800-820-6666</span>转8咨询</td>'+
                   ' <td height="22" style="padding-left:50px;">手机：<span style="border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data="1010-6666">1010-6666</span>转8咨询（境内免长话费）</td>'+
                 ' </tr>'+
                  '<tr>'+
                    '<td height="22" style="padding-left:50px;"></td>'+
                 ' </tr>'+
               ' </tbody></table>'+
             ' </td>'+
           ' </tr>'+
          '</tbody></table>'+
       ' </td>'+
      '</tr>'+
     ' <tr>'+
        '<td style="padding-top:15px;">'+
          '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:'+"'Tahoma'"+',sans-serif;font-size:12px;color:#4a4a4a;">'+
            '<tbody><tr>'+
              '<td height="10" style="border-top:1px solid #e8e8e8;"></td>'+
           ' </tr>'+
           ' <tr>'+
             ' <td height="30" align="right" valign="top">感谢您选择携程，祝您旅途愉快！</td>'+
            '</tr>'+
            '<tr>'+
              '<td align="right" valign="top">携程旅行网客户服务部</td>'+
            '</tr>'+
            '<tr>'+
              '<td align="right" valign="top"><span style="border-bottom:1px dashed #ccc;" t="5" times="">2015-08-07</span></td>'+
            '</tr>'+
          '</tbody></table>'+
        '</td>'+
      '</tr>'+
    '</tbody></table><img src="cid:00000002"/>',
    attachments: [{
        "filename": "nodejs.png",
        "path": app.get("public")+"/images/nodejs.png",
        "cid": '00000001'
    },
    {  
    "filename": "html5.jpg",  
    "contents": img, //导入图片文件  
    "cid": '00000002'
    },
    {  
    "filename": "antiLeech.jpg",  
    "path": app.get("public")+"/images/antiLeech.jpg", //导入图片文件  
    "cid": '00000003'
  }
  ]             
}

let sendMail = () => {
	logger.info("发送邮件");
	transporter .sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("邮件已经发送!");
	    }
	    //如果还需要实用其他的 smtp 协议，可将当前回话关闭
	    //smtpTransport.close();
	});
}
/**
 * 发送邮件
 */

let mail = {
	"sendMail" : sendMail
}
	
module.exports = mail;
 
