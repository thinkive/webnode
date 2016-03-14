"use strict"
let algo = require('ape-algorithm');

/**
@arr，要排序的数组
@direct,升序或者降序,asc desc
*/
let sort = (arr,direct) => {
	return algo.quicksort.sort(arr,direct);
};

/**
@arrObj，要排序的数组对象
@idex,排序对象值
@direct,升序或者降序,asc desc
*/

let sortObj = (arrObj,idex,direct) => {
	return algo.quicksort.sortObj(arrObj,idex,'desc');

};

/**
@mounts,随机生成数组数量
@min,数组最小值
@max,数组最大值
*/
let randomData = (mounts,min,max) => {
	return algo.data.randomData(mounts,min,max);
}
/*
 * @param arr Array 整数数组
 * @param num 桶的个数
 */
let bucketsort = (arr,num) => {
	return algo.bucketsort.sort(arr,num);//装到700
};

let quicksort = {
	sort:sort,
	sortObj:sortObj,
	randomData:randomData,
	bucketsort:bucketsort
	
};


module.exports = quicksort;