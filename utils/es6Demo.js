"use strict"
/**
DEMO1
*/
let promise = new Promise(function(resolve, reject) {
  //if里面异步操作
  /* console.log(1);
   
   setTimeout(function(){
	   console.log(2);
	   reject();
   },3000);
    console.log(3);
*/
});

promise.then(function(value) {
  console.log(4);
}, function(value) {
   console.log(5);
});

/**
DEMO2
*/
let timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

timeout(10000).then(() => {
  console.log('10秒后OK');
});

/**
DEMO3 伪代码XMLHttpRequest需要单独引入

var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.status === 200) { 
              resolve(this.response); 
          } else { 
              reject(new Error(this.statusText)); 
          }
    };
  });

  return promise;
};

getJSON('../data/columnMeta.js').then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
*/
/**
DEMO4
上面代码中，p1和p2都是Promise的实例，
但是p2的resolve方法将p1作为参数，这时p1的状态就会传递给p2。
如果调用的时候，p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；
如果p1的状态已经是fulfilled或者rejected，那么p2的回调函数将会立刻执行。
*/
var p1 = new Promise(function(resolve, reject){
  // ... some code
});

var p2 = new Promise(function(resolve, reject){
  // ... some code
  resolve(p1);
})

/**
DEMO5,链试回调
getJSON接着DEMO4
Promise.prototype.then方法返回的是一个新的Promise对象
上面的代码使用then方法，依次指定了两个回调函数。
第一个回调函数完成以后，会将返回结果作为参数，
传入第二个回调函数。
*/
/*getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // proceed
});*/

/**
DEMO6捕捉异常
*/
/*getJSON("/posts.json").then(function(posts) {
  // some code
}).catch(function(error) {
  // 处理前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});*/

/***
DEMO7 Promise.all方法，Promise.race方法
var p = Promise.all([p1,p2,p3]);
上面代码中，Promise.all方法接受一个数组作为参数，
p1、p2、p3都是Promise对象的实例。（Promise.all方法的参数不一定是数组，但是必须具有iterator接口，且返回的每个成员都是Promise实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，
p的状态才会变成fulfilled，
此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，
p的状态就变成rejected，
此时第一个被reject的实例的返回值，会传递给p的回调函数。

Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。


var p = Promise.race([p1,p2,p3]);
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。
*/
// 生成一个Promise对象的数组
/*var promises = [2, 3, 5, 7, 11, 13].map(function(id){
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function(posts) {
  // ...  
}).catch(function(reason){
  // ...
});*/

/**
DEMO8
接例子DEMO7
有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。
var jsPromise = Promise.resolve($.ajax('/whatever.json'));

*/



let es6 = {
	
};
module.exports = es6;