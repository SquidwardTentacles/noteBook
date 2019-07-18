// 业务处理
// 引入数据库操作
const sqlOptions = require('./db.js');
// 引入数据
// const data = require('./data.json');
const fs = require('fs');
const path = require('path');
// 渲染主页面
let data = [];
// 查询全部数据方法封装
let selectAll = res => {
  let sql = 'select * from books';
  let sdata = [];
  sqlOptions.base(sql, sdata, callback => {
    data = callback;
    if (res) {
      console.log('daat', data);

      res.render('index', { list: data });
    }
  });
};
exports.showIndex = (req, res) => {
  console.log('showAll');

  selectAll(res);
};
// 渲染添加页面
exports.toAddBook = (req, res) => {
  res.render('addBook', {});
};
let writePage = (obj, res) => {
  fs.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(obj, null, 4),
    err => {
      if (err) {
        res.send('err');
      } else {
        // 重定向
        res.redirect('/');
      }
    }
  );
};
// 添加书籍
exports.addBook = (req, res) => {
  let objData = req.body;
  // objData.id = data.length + 1;
  // 将新的数据提交到数组
  // data.push(objData);
  let sql = 'insert into books set ?';
  sqlOptions.base(sql, objData, callback => {
    res.redirect('/');
  });
  // 写入文件
  // writePage(data, res);
};
// 跳转编辑页面
exports.toEditBook = (req, res) => {
  selectAll();
  let obj = req.query;
  let list = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == obj.id) {
      list = data[i];
      break;
    }
  }
  res.render('editBook', list);
};
// 编辑图书
exports.editBook = (req, res) => {
  let dObj = req.body;
  data.forEach(element => {
    if (dObj.id == element.id) {
      let sql =
        'update books set name=?,auther=?,category=?,descrption=? where id=?';
      let datab = [];
      for (const key in dObj) {
        datab.push(dObj[key]);
      }
      datab.push(element.id);
      console.log(datab);

      sqlOptions.base(sql, datab, callback => {
        res.redirect('/');
        // res.render('/', { list: data });
      });
    }
  });
  // writePage(data, res);
};
// 删除图书
exports.delBook = (req, res) => {
  let obj = req.query;
  console.log(obj);
  data.forEach((element, index) => {
    if (element.id == obj.id) {
      data.splice(index, 1);
    }
  });
  console.log(data);

  writePage(data, res);
};
