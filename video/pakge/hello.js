const path = require('path');
const fs = require('fs');

// node.js, the same, but with sugar:
const md = require('markdown-it')();
// var result = md.render('# markdown-it rulezz!');
// console.log(result);

// 引入文件
const ypath = path.join(__dirname, 'index.html');
const targepath = path.join(__dirname, 'demo.html');
const dpath = path.join(__dirname, 'outline.md');
// 获取markdown文件
fs.readFile(dpath, 'utf8', (err, data) => {
  if (err) return;
  // 对markdown文件进行转换
  let result = md.render(data);
  // 读取模板内容
  fs.readFile(ypath, 'utf8', (err, tpldata) => {
    if (err) return;
    tpldata = tpldata.replace('{{ md }}', result);
    fs.writeFile(targepath, tpldata, err => {
      console.log('wancheng');
    });
  });
});
