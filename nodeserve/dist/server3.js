var http = require('http');
var fs = require('fs');

//主要思想就是任何一个静态文件也应该做响应，一个获取静态文件都应当请求来处理，这是主要思想
var server = http.createServer();

var handlerequest = function(request, respone) {
  var url = request.url;
  // respone.writeHead(200,{'Content-Type':'text/html'});
  if (url == '/') {
    respone.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var ns = fs.readFile('./index.html', function(err, data) {
      if (err) {
        console.error(err);
        return;
      }
      respone.end(data);
    });
    //respone.end();
  } else if (url != '/') {
    var surl = '.' + url;
    // console.log(surl.indexOf('?') != -1)
    if (surl.indexOf('?') != -1) {
      var type = surl.substring(surl.lastIndexOf(".") + 1, surl.indexOf("?"));
    } else {
      var type = surl.substr(surl.lastIndexOf(".") + 1, surl.length);
    }
    // console.log('1111', type)
    respone.writeHead(200, {
      'Content-type': "text/" + type
    });
    // respone.writeHead(200,{'Content-Type':'text/css'});
    // console.log(surl)
    if (surl.indexOf('?') != -1) {
      surl = surl.substring(0, surl.indexOf("?"));
    }
    var ns = fs.readFile(surl, function(err, data) {
      if (err) {
        console.error(err);
        return;
      }
      respone.end(data);
    });
  }
}
server.on('request', handlerequest);

server.listen(3000, function() {
  console.log("runing...");
})