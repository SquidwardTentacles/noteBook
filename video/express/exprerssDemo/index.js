// 动态网站开发
// 引入模块
const fs = require('fs');
const path = require('path');
const http = require('http');
const scoreData = require('./scoreData.json');
const querystring = require('querystring');
const template = require('art-template');
// 创建http服务
http
  .createServer((req, res) => {
    // 路由 (请求路径加请求方式 )
    // 查询成绩入口
    if (req.url.startsWith('/query') && req.method == 'GET') {
      console.log('get');
      // fs.readFile(
      //   path.join(__dirname, 'view', 'index.html'),
      //   'utf8',
      //   (err, content) => {
      //     if (err) {
      //       // 如果出错了 定义错误的状态码 以及请求头信息
      //       res.writeHead(500, {
      //         'Conten-Type': 'text/plain;charset=utf8'
      //       });
      //       res.end('请求异常');
      //     }
      //     res.end(content);
      //   }
      // );
      // 使用 art-template
      let content = template(path.join(__dirname, 'view', 'index.art'), {});
      res.end(content);
    } else if (req.url.startsWith('/score') && req.method == 'POST') {
      console.log('post');
      // // 获取成绩的结果
      let pdata = '';
      req.on('data', chunk => {
        pdata += chunk;
      });
      req.on('end', () => {
        let obj = querystring.parse(pdata);
        let result = scoreData[obj.code];
        let content = template(
          path.join(__dirname, 'view', 'result.art'),
          result
        );
        res.end(content);
      });
    } else if (req.url.startsWith('/all') && req.method == 'GET') {
      let arr = [];
      for (let key in scoreData) {
        arr.push(scoreData[key]);
      }
      // 全部成绩
      let content = template(path.join(__dirname, 'view', 'all.art'), {
        list: arr
      });
      res.end(content);
    }
  })
  .listen(3000, () => {
    console.log('running');
  });
