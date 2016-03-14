"use strict"
/********************** String工具类***************/
//trim去掉字符串两边的指定字符,默去空格
String.prototype.trim = (tag)  => {
    if (!tag) { 
        tag = '\\s';
    }else { 
        if (tag == '\\') { 
        tag = '\\\\'; 
    } else if (tag == ',' || tag == '|' || tag == ';') { 
            tag = '\\' + tag; 
        }else { 
            tag = '\\s'; 
        } 
    }
    eval('let reg=/(^' + tag + '+)|(' + tag + '+$)/g;'); 
    return this.replace(reg, '');
};
//字符串截取后面加入...
String.prototype.interceptString = (len)  => {
    if (this.length > len) {
        return this.substring(0, len) + "...";
    } else {
        return this;
    }
}
//将一个字符串用给定的字符变成数组
String.prototype.toArray = (tag)  => {
    if (this.indexOf(tag) != -1) {
        return this.split(tag);
    }else {
        if (this != '') {
            return [this.toString()];
        }else {
            return [];
        }
    }
}
//只留下数字(0123456789)
String.prototype.toNumber= ()  => { 
    return this.replace(/\D/g, ""); 
}
//保留中文  
String.prototype.toCN= ()  => {  
    let regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;  
    return this.replace(regEx, '');  
}
//转成int
String.prototype.toInt= () =>  {  
    let temp = this.replace(/\D/g, "");
    return isNaN(parseInt(temp)) ? this.toString() : parseInt(temp);  
}
//是否是以XX开头
String.prototype.startsWith= (tag) => {
    return this.substring(0, tag.length) == tag;
}
//是否已XX结尾
String.prototype.endWith= (tag) => {
    return this.substring(this.length - tag.length) == tag;
}
//StringBuffer
let StringBuffer = ()  => {
    this._strs = new Array; 
};
StringBuffer.prototype.append =  (str)  => { 
    this._strs.push(str); 
}; 
StringBuffer.prototype.toString = ()  => { 
    return this._strs.join(""); 
};
String.prototype.replaceAll = (s1,s2) => {
    return this.replace(new RegExp(s1,"gm"),s2);
}                                

/********************** Arry ***************/
//根据数据取得再数组中的索引
Array.prototype.getIndex = (obj) => {
    for (let i = 0; i < this.length; i++) {
        if (obj == this[i]) {
            return i;
        }
    }
    return -1;
}
//移除数组中的某元素
Array.prototype.remove= (obj) => {
    for (let i = 0; i < this.length; i++) {
        if (obj == this[i]) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
}
//判断元素是否在数组中
Array.prototype.contains= (obj) =>  {
    for (let i = 0; i < this.length; i++) {
        if (obj == this[i]) {
            return true;
        }
    }
    return false;
}                    

let dateUtils = {
	
};
module.exports = dateUtils;