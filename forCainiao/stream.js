// // 从流中读取数据
// var fs = require('fs');
// var data = '';
// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');
// // 设置编码格式
// readerStream.setEncoding('UTF8');
// // 处理流事件 data end and error
// readerStream.on('data', chunk => {
//   data += chunk;
// });
// readerStream.on('end', () => {
//   console.log(data);
// });
// readerStream.on('error', err => {
//   console.log(err.stack);
// });
// console.log('over');

// 写入流
var fs = require('fs');
var data = '菜鸟教程:www.baidu.com';
// 创建一个可以写入的流 写入到文件
var writterStream = fs.createWriteStream('input.txt');
// 使用utf-8编码
writterStream.write(data, 'UTF8');
// 标记文件末尾
writterStream.end();
// 处理流事件
writterStream.on('finish', () => {
  console.log('写入完成');
});
writterStream.on('error', () => {
  console.log(err.stack);
});
console.log('over');
