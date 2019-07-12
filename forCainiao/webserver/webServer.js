// node.js http模块主要用于搭建http客户端和服务端 使用客户端及服务端功能必需引入http模块   一个基本的服务端架构
var http = require('http');
var fs = require('fs');
var url = require('url');

// 创建服务器
http
  .createServer(function(request, response) {
    // 解析请求 包括文件名
    var pathname = url.parse(request.url).pathname;
    // 输出请求的文件名
    console.log('request' + pathname);
    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function(err, data) {
      if (err) {
        console.log(err);
        // http 状态码 404 NOT FOUND
        // Content Type :text/html
        response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        // 响应内容
        console.log('success' + data);

        response.write(data.toString());
      }
      // 发送响应数据1
      response.end();
    });
  })
  .listen(8000);
// 控制台输出
console.log('server run');
