"use strict"
let crypto=require('crypto');
let assert = require('assert');  
let fs = require('fs');
let ursa = require('ursa');
let key = ursa.createPrivateKey(fs.readFileSync('/ssl/rsa/my-server.key.pem'));
let crt = ursa.createPublicKey(fs.readFileSync('/ssl/rsa/my-server.pub'));
//AES加密
let encrypt = (str, secret)  => {
    let cipher = crypto.createCipher('aes-256-cbc', secret);
    let enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
//AES解密
let decrypt = (str, secret)  => {
    let decipher = crypto.createDecipher('aes-256-cbc', secret);
    let dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

//RSA加密 
let encryptRsa = (str) =>  {
	return  crt.encrypt(str, 'utf8', 'base64');	
}	

//RSA解密
let decryptRsa = (str) => {
	return  key.decrypt(str, 'base64', 'utf8');	
}


let cipheriv = (en, code, data) => {   
	 let buf1 = en.update(data, code), buf2 = en.final();  
	 let r = new Buffer(buf1.length + buf2.length);   
	 buf1.copy(r); 
	 buf2.copy(r, buf1.length);   
	 return r;
 };
 

 //DES加密 data是数据 key 就是密钥  vi就是 密钥向量 
let encrypt3Des = (data, key, ivs) =>  {  
    let keys = getDesKey(key);  
	/*let buffArray = '';//输出数组
	for(let i = 0;i<keys.length;i++)
	{
		buffArray += ','+keys.readInt8(i).toString();
	}*/
    let iv = new Buffer(ivs ? ivs : 0);
    let plaintext = new Buffer(data);
    let alg = 'des-ede3';
    let autoPad = true;   
    let cipher = crypto.createCipheriv(alg, keys, iv);  
    cipher.setAutoPadding(autoPad);  //default true  
	//let ciph = cipher.update(plaintext, 'utf8', 'hex');  //返回字符串 
    let ciph = cipher.update(plaintext);  //返回的是buffer
    //ciph += cipher.final();//返回字符串连接方式
	ciph = Buffer.concat([ciph,cipher.final()]);	//返回buffer的连接方式	
	//decrypt3Des(ciph,keys,iv);//解密
    return (ciph.toString("base64"));   
  
}  

 let getDesKey = (norInfo) => {
	let key = new Buffer(24);
	for (let i = 0; i < 3; i++)
	{
		let str = Buffer(norInfo.substring(i));
        let buf = encryptMd51(str);
		for (let j = 0; j < 8; j++)
		{			
			key[(j + i * 8)] = buf[j];
		}
	}
	return key;	 
 }
 

 //DES解密，ciph密文，
 let decrypt3Des = (ciph, key, vi) => { 
    let keys = key ? key : getDesKey(key); 
    let iv = new Buffer(iv ? iv : 0);
    let alg = 'des-ede3';
    let autoPad = true;    
	let decipher = crypto.createDecipheriv(alg, keys, iv);  
    decipher.setAutoPadding(autoPad)  
    let txt = decipher.update(ciph);  
    txt += decipher.final(); 
    return 	txt;
 };

 let encryptMd51 = (data) =>  {
	let buf = new Buffer(data);
	//let str = buf.toString("binary");
    return crypto.createHash("md5").update(buf).digest();
}
 
 //MD5加密
 let encryptMd5 = (data) =>  {
    let buf = new Buffer(data,'hex');
    let str = buf.toString("binary");
	//MD5最后生成的摘要信息是16个字节，SHA1是20个字节。hex表示数据以16机制，默认是
    return crypto.createHash("md5").update(str).digest();
}

let crytoUtils = {
	encrypt:encrypt,
	decrypt:decrypt,
	encrypt3Des:encrypt3Des,
	decrypt3Des:decrypt3Des,
	encryptRsa:encryptRsa,
	decryptRsa:decryptRsa,
	encryptMd5:encryptMd5
};
module.exports = crytoUtils;