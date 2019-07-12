// 管道流
var fs = require('fs');
// 创建一个可读流
var readStream = fs.createReadStream('input.txt');
// 创建一个可写流
var writeStream = fs.createWriteStream('pipe.txt');
// 管道读写操作
readStream.pipe(writeStream);

var data = '';
readStream.on('data', chunk => {
  data += chunk;
});
readStream.on('end', () => {
  console.log(data);
});
console.log('over');
