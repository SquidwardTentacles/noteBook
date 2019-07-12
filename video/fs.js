// 文件操作
// const fs = require('fs');
// 异步
// fs.stat('./buffer', (err, stat) => {
//   // 一般回调函数的第一个参数为错误对象 如为null则没有错误
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(stat);
//   console.log(stat.isDirectory());
//   // console.log(stat.isFile());
// });
// 同步 有返回值
// let stat = fs.statSync('./path.js');
// console.log(stat);

// 读文件操作
// const fs = require('fs');
// const path = require('path');

// let startpath = path.join(__dirname, 'data.txt');
// // 如果有第二个餐数 并且是编码 那么返回的就是字符串 否则是buffer的实例对象
// fs.readFile(startpath, 'utf8', (err, data) => {
//   if (err) return;
//   console.log(data);
// });

// 大文件操作 (流式操作)

// const path = require('path');
// const fs = require('fs');
// // 原文件地址
// let spath = path.join('D:\\BaiduNetdiskDownload', './BaiduNetdiskDownload.zip');
// // 写入文件地址
// let dpath = path.join('C:\\users\\Administrator\\Desktop', 'file.zip');

// 读文件
// let readStream = fs.createReadStream(spath);
// // 写文件
// let writeStream = fs.createWriteStream(dpath);
// // 基于事件进行处理
// // 声明变量 查看执行次数
// let num = 0;
// // 写入文件操作
// readStream.on('data', chunk => {
//   num++;
//   writeStream.write(chunk);
// });

// // 文件读写完成
// readStream.on('end', () => {
//   console.log('读写完成' + num);
// });
// -----------------------------------------
// pipe 管道符
// fs.createReadStream(spath).pipe(fs.createWriteStream(dpath));

// 目录操作
// 创建目录
const fs = require('fs');
const path = require('path');
// // 异步
// // fs.mkdir(path.join(__dirname, 'mkdirCreatye'), err => {
// //   console.log(err);
// // });
// // 同步
// fs.mkdirSync(path.join(__dirname, 'mkdirSync'));
// 读取目录
// fs.readdir(__dirname, (err, files) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(files);
//     files.forEach((item, index) => {
//       fs.stat(path.join(__dirname, item), (err, stat) => {
//         if (err) {
//           console.log(err);
//         } else {
//           if (stat.isFile()) {
//             console.log(item + '文件');
//           } else if (stat.isDirectory) {
//             console.log(item + '目录');
//           }
//         }
//       });
//     });
//   }
// });

// 删除目录
// fs.rmdir(path.join(__dirname, 'mkdirCreatye'), err => {
//   console.log(err);
// });

// 写文件操作
fs.writeFile(path.join(__dirname, 'data.txt'), 'write for fs.js', err => {
  console.log(err);
});
