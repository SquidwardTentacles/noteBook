// 路由模块
const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 路由处理
// 显示主页面
router.get('/', service.showIndex);
// 显示添加书籍页面
router.get('/toAddBook', service.toAddBook);
// 添加图书
router.post('/addBook', service.addBook);
// 跳转编辑图书
router.get('/toEditBook', service.toEditBook);
// 编辑图书
router.post('/editBook', service.editBook);
// 删除图书
router.get('/delBook', service.delBook);
// 导出
module.exports = router;
