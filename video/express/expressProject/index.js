/*
  模板引擎整合 
*/
const express = require('express');
const template = require('art-template');
const app = express();
const path = require('path');
// 引入模板
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎 view engine固定格式 art文件后缀
app.set('view engine', 'art');
// 使art-template兼容express
app.engine('art', require('express-art-template'));
app.get('/list', (req, res) => {
  let obj = {
    title: '水果',
    list: ['apple', 'orange', 'banana']
  };
  res.render('list', obj);
});

app.listen(3000, () => {
  console.log('running');
});
