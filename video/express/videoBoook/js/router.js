const express = require('express');
const router = express.Router();
const service = require('./service.js');
// 路由处理
// 进入登录页
router.get('/', service.toLogin);
// 进入注册页
router.get('/toRegister', service.toRegister);
// 登录验证
router.post('/login', service.login);
// 注册
router.post('/register', service.register);
// 书籍信息主页
router.get('/book', service.book);
// 进入添加图书
router.get('/toAddbook', service.toAdbook);
// 添加图书
router.post('/addBook', service.addBook);
// 进入修改
router.get('/toEditBook', service.toEditBook);
// 提交编辑数据
router.post('/editBook', service.editBook);
// 删除
router.get('/delBook', service.delBook);
// 导出
module.exports = router;
