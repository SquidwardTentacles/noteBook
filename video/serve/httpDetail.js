// 初步实现服务器功能
const http = require('http');
// // http.createServer() 返回一个serve对象
// let server = http.createServer();
// // 绑定请求事件
// server.on('request', (req, res) => {
//   // req 请求信息 res 响应信息
//   // 响应信息
//   res.end(server);
// });
// server.listen(3000);

// http
//   .createServer((req, res) => {
//     res.end('ok');
//   })
//   // 可以指定监听的端口 不指定则默认为127.0.0.1 或localhost
//   .listen(3000, '192.168.1.3', () => {
//     console.log('running');
//   });

// 处理请求路径的分发
// req 为Class: http.IncomingMessage的实例对象 res为Class: http.ServerResponse实例对象

// http
//   .createServer((req, res) => {
//     // res.end(req.url);
//     // 分发处理
//     if (req.url.startsWith('/index')) {
//       // write 向客户端响应内容 可以执行多次
//       res.write('hello');
//       res.write('hi');
//       // end用来完成响应 只能执行一次
//       res.end('index');
//     } else if (req.url.startsWith('/other')) {
//       res.end('other');
//     } else {
//       res.end('none');
//     }
//   })
//   .listen(3000, '192.168.1.3', () => {
//     console.log('running');
//   });
// const path = require('path');
// const fs = require('fs');
// let fileFunc = (filePath, res) => {
//   fs.readFile(path.join(__dirname, 'www', filePath), 'utf8', (err, data) => {
//     if (err) {
//       res.end('err');
//     } else {
//       res.end(data);
//     }
//   });
// };
// http
//   .createServer((req, res) => {
//     // res.end(req.url);
//     // 分发处理
//     if (req.url.startsWith('/index')) {
//       fileFunc('index.html', res);
//     } else if (req.url.startsWith('/about')) {
//       fileFunc('about.html', res);
//     } else if (req.url.startsWith('/list')) {
//       fileFunc('list.html', res);
//     } else {
//       // 设置请求头信息
//       res.writeHead(200, {
//         'Content-Type': 'text/html;charset=utf8'
//       });
//       res.end('页面未找到');
//     }
//   })
//   .listen(3000, '192.168.1.3', () => {
//     console.log('running');
//   });

const staticServer = require('./staticServerModius.js');
const path = require('path');
// const fs = require('fs');
// // 引入编码集合
// const mime = require('./mime.json');
http
  .createServer((req, res) => {
    staticServer.staticServer(req, res, path.join(__dirname, 'www'));
  })
  .listen(3000, () => {
    console.log('running');
  });
