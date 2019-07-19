const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./js/router.js');
// // 引入封装的操作数据库的模块
// const db = require('./js/db.js');
// 引入模板引擎
const template = require('art-template');
// 设置模板引擎的路径 views固定的写法
app.set('views', path.join(__dirname, 'public'));
// 设置模板引擎
app.set('view engine', 'html');
// 使art-template兼容express引擎
app.engine('html', require('express-art-template'));
// 让bodyParser兼容form表单提交格式的参数
// parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: false }));
// 监管静态资源
app.use(express.static('public'));
// 兼容json格式的请求参数
app.use(bodyParser.json());
// 路由与事件请求封装
app.use(router);

// // 监听端口
app.listen(3000, () => {
  console.log('running...');
});
