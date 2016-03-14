#解决符合小型公司内部node解决方案
1. **function000112**测试generator的使用方法
2. **function000113**测试异常处理的使用方法
3. **function000114**测试标准接口定义规范
5. **function000005**测试调用阿里大鱼接口
6. **function000006**测试操作xlsx
7. **function000008**测试爬虫DEMO
8. **function000105**测试promise对象的使用


> 接口功能号化，一个功能实现一个具体业务单元，定义服务层，用于处理每个业务单元具体实现操作(操作数据库,本地文件，webservice)

##先啰嗦几句##
不得不说，react.js + Flux 的编程方式上手也许有点困难， 因为它并不是一种 *MVC* 模式， **它只是一种编程思想** ，意识到这一点，也许你能更快的接受它。

在本次更新中，我们不仅抛弃了`angular.js`，取而代之的是`react.js + Flux`终结者开发模式。而且，我们加入了另外一些方便我们编程的工具：

- react.js + Flux

[React 入门教程](http://hulufei.gitbooks.io/react-tutorial/content/index.html)
- less

Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。
[点我快速入门](http://less.bootcss.com/)
- webpack

Webpack 是一个前端资源加载/打包工具，只需要相对简单的配置就可以提供前端工程化需要的各种功能，并且如果有需要它还可以被整合到其他比如 Grunt / Gulp 的工作流。

##项目本地部署##

1. 进入项目根目录，执行`npm install` 安装依赖，这次我们加入了很多实用的工具。
2. 安装`webpack`: `npm install -g webpack`
3. 执行`webpack` 来编译文件（JSX, LESS ...）
4. 最后`npm start`运行服务器（服务器运行在：http://localhost:3000）
5. 打开 http://localhost:3000/portal 可查看门户，添加新的模板。

have fun !  :)