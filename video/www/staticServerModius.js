/*
  静态资源服务器封装
*/
const path = require('path');
const fs = require('fs');
// 引入编码集合
const mime = require('./mime.json');
exports.staticServer = (req, res, root) => {
  console.log(root);
  console.log(req.url);

  fs.readFile(path.join(root, req.url), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html;charset=utf8'
      });
      res.end('页面未找到');
    } else {
      // 设置头信息
      let mimel = 'text/html';
      let extname = path.extname(req.url);
      mimel = mime[extname];
      mimel += mimel.startsWith('text') ? ';charset=utf8' : '';
      res.writeHead(200, { 'Content-Type': mimel });
      res.end(data);
    }
  });
};
