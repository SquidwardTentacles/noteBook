var http = require('http');
http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('hello Word');
  })
  .listen(3000);
console.log('run 3000');
