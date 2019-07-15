/*
  动态服务器 路由分发
*/
const http = require('http');
const ss = require('./www/staticServerModius');
// 解析get 参数
const url = require('url');
// 解析post
const querystring = require('querystring');
http
  .createServer((req, res) => {
    console.log(req.url.startsWith);

    if (req.url.startsWith('/www')) {
      ss.staticServer(req, res, __dirname);
    }
    // 动态资源
    if (req.url.startsWith('/login')) {
      // 判断请求类型
      if (req.method == 'GET') {
        // 拿到请求的参数 true将参数解析成为对象格式
        let params = url.parse(req.url, true).query;
        if (params.username == 'admin' && params.password == '123') {
          res.end('get success');
        } else {
          res.end('get err');
        }
      } else if (req.method == 'POST') {
        let pdata = '';
        req.on('data', chunk => {
          pdata += chunk;
        });
        req.on('end', () => {
          let obj = querystring.parse(pdata);
          if (obj.username == 'admin' && obj.password == '123') {
            res.end('post success');
          } else {
            res.end('post err');
          }
        });
      }
    }
  })
  .listen(3000, () => {
    console.log('running...');
  });
