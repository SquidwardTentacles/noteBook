var express = require('express');
var app = express();
// express 应用使用回调函数的参数 req 与 res 对象来处理请求和响应数据
// app.get('/', function(req, res) {
//   res.send('hello wor');
// });
// app.get('/del', function(req, res) {
//   res.send('删除');
// });
// var server = app.listen(8081, function() {
//   var host = server.address().address;
//   var port = server.address().pport;
//   console.log('应用实例，访问地址为 http://%s:%s', host, port);
// });
// 处理静态文件
app.use('/img', express.static('img'));
app.get('/', function(req, res) {
  res.send('hello word');
});
app.get('/index.htm', function(req, res) {
  res.sendFile(__dirname + '/' + 'index.htm');
});
app.get('/process_get', function(req, res) {
  var obj = {
    name: req.query.name,
    word: req.query.word
  };
  console.log(obj);
  res.send(JSON.stringify(obj));
});
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('应用实例');
});
// var server = app.listen(8081, function() {
//   console.log('应用实例', host, port);
// });
