// 将data.json文件转化成spl语句
const path = require('path');
const fs = require('fs');

let splArr = [];
fs.readFile(
  path.join(__dirname, '../books', 'data.json'),
  'utf8',
  (err, content) => {
    if (err) return;

    // 格式转换
    let list = JSON.parse(content);
    console.log(list);
    // 声明一个数组保存生成的sql信息
    list.forEach(element => {
      let spl = `insert into books (name,auther,category,descrption) values ('${
        element.name
      }','${element.auther}','${element.category}','${element.desc}');`;
      splArr.push(spl);
    });
    console.log(splArr);
    fs.writeFile(
      path.join(__dirname, 'data.js'),
      splArr.join(''),
      'utf8',
      err => {
        console.log(err);

        console.log(splArr.join(''));
      }
    );
  }
);
