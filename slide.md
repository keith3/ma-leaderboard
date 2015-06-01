title: Meteor遇见AngularJS
author:
  name: 卢峰
  url: http://lufeng.me
output: MeteorAngular.html
controls: true

--

# Meteor
Company , Platform, JavaScript Framework
- Meteor: 开发框架
- Galaxy: 应用托管平台

--

### Whats Meteor
[Meteor](https://www.meteor.com/) is a complete open source **platform** for building web and mobile apps in pure JavaScript.

### The Meteor mission
Build a new platform for cloud applications that will become as ubiquitous as previous platforms such as Unix, HTTP, and the relational database.
--

### Meteor Subprojects
- Libraries
Blaze (a user interface library) and Tracker (a system for transparent reactive programming);

- Tools
  Isobuild, a complete build system;

- Standards
 DDP (Distributed Data Protocol), which is like "REST for websockets";

- Services
 Official package server and a build farm.

--
 
### Core Projects
- Blaze
Reactive UI Library
- Tracker
Reactive programming made easy
- DDP (Distributed Data Protocol)
Websocket-based data protocol
- Livequery
Live database connectors
- Full Stack Database Drivers
User the same database API on client and server
- Isobuild
Unified build system for browser, server, and mobile

-- 

### Quick Demo
```bash
$ meteor create --example leaderboard
```

-- 

### 特性
实时性，多客户端同时刷新，加载快

- Latency compensation (延迟补偿)
- 客户端渲染视图
- Publish & Subscribe (发布与订阅)
- 客户端数据缓存

--

### Meteor实现原理
![images](http://7b1ezf.com1.z0.glb.clouddn.com/meteor-work.png)
￼
--

### 重要概念
1. [发布与订阅 (publications and subscriptions)](http://zh.discovermeteor.com/chapters/publications-and-subscriptions/)
    - [观察者模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-pattern-observer-mode/)
    - 漏斗，客户端得到的数据是服务端过滤后的结果
    - 服务器不再发送 HTML 代码到客户端，而是推送原始数据
    - 不必等待服务器传回数据，而是立即访问甚至修改数据 (延迟补偿)
2. [延迟补偿 (latency compensation)](http://zh.discovermeteor.com/chapters/latency-compensation/)
    - 客户端即时响应，客户端本地模拟数据库操作
    - 服务端响应返回操作结果
    
--

### 安全？
- meteor remove autopublish  insecure
- [Meteor Methods vs Client-Side Operations](https://www.discovermeteor.com/blog/meteor-methods-client-side-operations/)
- collection.allow & deny 限制客户端，secure模式默认deny all
- 使用Meteor.methods而不是客户端调用insert, update, remove...

--

## Meteor + AngularJS
MEAN ?
- MongoDB + Express + AngularJS + Node.js + Grunt/Gulp
- Meteor + AngularJS
- [Thoughts on angular-meteor as a great MEAN Stack](http://info.meteor.com/blog/thoughts-on-angular-meteor-as-a-great-mean-stack)

--

### AngularJS比Blaze好？
- 共同点
    - 数据绑定
    - 模板组件
- AngularJS
    - MV* 开发模式
    - 路由
    
--

### AngularJS + Meteor Demo
目录结构
```bash
.
├── both                        // 目录下的文件在客户端与服务器都会运行，它们也是应用启动后最先运行的代码
│   └── collections             // 数据库各个表的model定义
│       └── users.js
├── client                      // 只在客户端运行的代码
│   ├── css                     // css样式文件夹
│   ├── index.html              // 唯一的.html文件，自定义的angular视图模板需要'以.ng.html结尾'
│   ├── lib                     // lib文件夹比较特殊，目录下存放客户端下最先加载的文件，'注意不要写成libs'
│   │   └── app.js              // 推荐在这里定义angular.module()
│   ├── modules                 // 定义模块
│   │   └── users
│   │       ├── controllers           
│   │       │   └── users.js
│   │       └── views              
│   │           └── index.ng.html
│   └── route.js                // 路由配置文件
├── public                      // 存放资源文件，包括字体，图片等
└── server                      // 只在服务端运行的代码
    ├── collections             // 定义各个collection的数据库操作权限
    │   └── users.js  
    ├── methods                 // 定义方法
    │   └── users.js
    └── publish                 // 发布数据
        └── users.js
```
--

### Init packages
```bash
$ meteor remove autopublish insecure
$ meteor add urigo:angular angularui:angular-ui-router
```
--

### Leaderboard Demo with Meteor + AngularJS
```bash
$ git clone git@github.com:keith3/ma-leaderboard.git
$ cd ma-leaderboard 
$ meteor
````
--

### 开发中的一些坑
- 目录结构及文件命名
- 环境变量MONGO_URL
- 部署后初始化，添加管理员用户
- ...

--

## 开发Meteor Package

为什么不用Npm
[https://github.com/meteor/meteor/pull/516#issuecomment-12919473](https://github.com/meteor/meteor/pull/516#issuecomment-12919473)
- 客户端与服务端
- 包内文件类型多样
- 包命名，官方包与个人包
- 部署钩子与配置，(email)

--

### 示例：在Npm模块基础上开发Meteor package
有关Npm接口的代码只能用在server端。
--

### 步骤
- 注册Meteor账号
- 终端登录
```bash
$ meteor login
```
- 创建package
```bash
$ meteor create --package validator
$ cd validator
```
```
.
├── package.js                      // 包的配置
├── README.md
├── validator.js                     // 代码主体
└── validator-tests.js            // 测试代码
```
--

### validator.js 
```
validaotr = Npm.require('validator')
```
--

### package.js
```
Package.describe({
  name: 'validator',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

// 重点
Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('validator.js', 'server');
  //  api.export('validator', ['server', 'client']);
  api.export('validator', 'server');            // validator 变量需要在validator.js中声明，不要加var
});

Package.onTest(function(api) {
  ...
});
```
--

### 本地测试
```bash
$ meteor create package-test
$ cd package-test
$ mkdir package
$ ln -s package/dir/ validator
$ meteor add validator
```
在meteor应用的server部分直接调用validator全局变量
--

### 发布
```bash
$ meteor publish
```
--

## Meteor应用部署

- [mup](https://github.com/arunoda/meteor-up)
- 手动
--

### 本地打包
```bash
$ meteor build meteor/app/dir
```
--

### 服务器环境
- [nodeenv](https://github.com/ekalinin/nodeenv)
- [PM2](https://github.com/Unitech/PM2)是一个带有负载均衡功能的Node应用的进程管理器。

--

### 步骤
```bash
# 局部安装
$ virtualenv env
$ source env/bin/activate
(env) $ pip install nodeenv
(env) $ nodeenv meteorenv
(env) $ source meteorenv/bin/active
# 安装指定版本的Node.js和Npm
(env)(meteorenv) $ nodeenv --node=0.10.36 --prebuilt env-0.10.36-prebuilt  --npm=1.4.28
# 虚拟环境中全局安装PM2
(env)(meteorenv) $ npm install -g pm2
# 解压app.tar.gz
(env)(meteorenv) $ tar zxf app.tar.gz
(env)(meteorenv) $ cd bundle/programs/server
(env)(meteorenv) $ npm install
```
--

### 启动服务
```bash
$ export MONGO_URL=mongodb://localhost/app PORT=4000 ROOT_URL=http://domain.name pm2 start main.js
```
--

## Q & A
1. 国内没人用Meteor？
    - 公司并没有在国内市场做什么推广，现阶段主要针对北美市场
    - Meteor 是个全栈框架，目前国内的技术大环境下，前端后端分开依然是主流，有合适场景使用 Meteor 的公司并不多
    -  国内用 Meteor 的 package server 会受到 GFW 的影响
2. Meteor的适用场景？
    - 实时数据是 Meteor 的核心价值
    - 最终目标是让 Meteor 适合大部分常见的应用类型 
3. 把angular-meteor的开发者加入Meteor开发组的目的？
    - 推广的原因
    - 平台开放化 ，让开发者能够更自由地选择前端组件

Answers from [Evan You](https://github.com/yyx990803)

