// const queryString = require('querystring');
// let obj = queryString.parse('foo=bar&abc=xyz&abc=123');
// console.log(obj);

// let str = queryString.stringify(obj);
// console.log(str);

const http = require('http');
const queryString = require('querystring');
http
  .createServer((req, res) => {
    if (req.url.startsWith('/login')) {
      // 接收post 请求参数
      let pdata = '';
      // 此方法会执行多次
      req.on('data', chunk => {
        pdata += chunk;
      });
      // 参数接收完毕时的方法
      req.on('end', () => {
        console.log(pdata);
        let obj = queryString.parse(pdata);
        console.log(obj);
        console.log(queryString.stringify(obj));

        res.end(obj.name + '---------' + obj.word);
      });
    }
  })
  .listen(3000, () => {
    console.log('running...');
  });
