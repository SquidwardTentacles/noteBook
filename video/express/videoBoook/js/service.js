// 引入封装的操作数据库的模块
const db = require('./db.js');

// 进入登录页
exports.toLogin = (req, res) => {
  res.render('login', {});
};
// 进入注册页
exports.toRegister = (req, res) => {
  res.render('register', {});
};
// 进行登录验证
exports.login = (req, res) => {
  let reqObj = req.body;
  let sql =
    'select count(*) as total from userinfo where username=? and password=?';
  let data = [reqObj.username, reqObj.password];
  db.base(sql, data, callback => {
    if (callback.total == 0) {
      // res.send('login err');
    } else {
      res.json({errcode:1})
      // res.redirect('book');
    }
  });
};
// 注册
exports.register = (req, res) => {
  let dobj = req.body;
  let sql = 'insert into userinfo set ?';
  db.base(sql, dobj, result => {
    if (result.affectedRows == 1) {
      res.redirect('/');
    }
  });
};
// 渲染书籍主页面
exports.book = (req, res) => {
  let sql = 'select * from books';
  let data = [];
  db.base(sql, data, result => {
    // res.render('book', { list: result });
    res.json({result})
  });
};
// 渲染添加图书
exports.toAdbook = (req, res) => {
  res.render('addBook', {});
};
// 添加图书
exports.addBook = (req, res) => {
  let dobj = req.body;
  let sql = 'insert into books set ?';
  db.base(sql, dobj, result => {
    if (result.affectedRows == 1) {
      res.redirect('book');
    }
  });
};
// 进入修改
exports.toEditBook = (req, res) => {
  let dobj = req.query;
  let sql = 'select * from books where id=?';
  db.base(sql, [dobj.id], result => {
    res.render('editBook', result[0]);
  });
};
// 提交编辑
exports.editBook = (req, res) => {
  let dobj = req.body;
  let sql =
    'update books set name=?,auther=?,category=?,descrption=? where id=?';
  let data = [dobj.name, dobj.auther, dobj.category, dobj.desc, dobj.id];
  db.base(sql, data, result => {
    if (result.affectedRows == 1) {
      res.redirect('book');
    } else {
      res.send('error');
    }
  });
};
// 删除
exports.delBook = (req, res) => {
  let id = req.query.id;
  let sql = 'delete from books where id=?';
  let data = [id];
  db.base(sql, data, result => {
    if (result.affectedRows == 1) {
      res.redirect('book');
    } else {
      res.send('error');
    }
  });
};
