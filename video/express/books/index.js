// 图书管理系统
// 引入相关资源
const express = require('express');
const path = require('path');
const app = express();
const template = require('art-template');
const bodyParser = require('body-parser');

// 启用静态资源服务
app.use('/www', express.static('public'));
// 引入请求模块
const router = require('./router.js');
// 设置模板引擎
// 设置路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));
// parse application/x-www-form-urlencoded 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// 启动服务器功能配置路由
app.use(router);
// 监听端口
app.listen(3000, () => {
  console.log('running...');
});
