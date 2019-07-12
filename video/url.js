// const url = require('url');
// let str = 'http://www.baidu.com/adc?name=zhang&password=123';
// // 第一个参数 地址 第二个参数 是否将参数转为对象格式
// let back = url.parse(str, true);
// console.log(back.query.name);

const url = require('url');
const http = require('http');

http
  .createServer((req, res) => {
    let obj = url.parse(req.url, true);
    res.end(obj.query.username + '<br/>' + obj.query.password);
  })
  .listen(3000, () => {
    console.log('running...');
  });
