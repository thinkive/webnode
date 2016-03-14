/**
 * 2015-03-22
 * mayc
 * generate keys
 */
"use strict"
let fs = require('fs');
let ursa = require('ursa');

let modulusBit = 512;  
let key  = ursa.generatePrivateKey(modulusBit, 65537);

let privatePem = ursa.createPrivateKey(key.toPrivatePem()); //生成私钥
let privateKey = privatePem.toPrivatePem('utf8');
fs.writeFile('private.pem', privateKey, 'utf8', function(error){
    if(error){
        throw error;
    }
    console.log('\n私钥privateKey已经保存\n');
    console.log('\n私钥privateKey：\n' + privateKey);
});


let publicPem = ursa.createPublicKey(key.toPublicPem());   //生成公钥
let publicKey = publicPem.toPublicPem('utf8');
fs.writeFile('public.pub', publicKey, 'utf8', function(error){
    if(error){
        throw error;
    }
    console.log('\n私钥publicKey已经保存\n');
    console.log('\n私钥publicKey：\n' + publicKey);
});