const db = require("./db").base;
// 登录
let obj = {};
exports.login = (req, res) => {
  let dobj = req.body;
  let sql =
    "select count(*) as total from userinfo where username=? and password=?";
  let data = [dobj.username, dobj.password];
  db(sql, data, callback => {
    obj = {};
    if (callback[0].total == 0) {
      obj.message = "账号或密码错误";
      obj.errcode = 1;
    } else {
      obj.errcode = 0;
      obj.message = "登录成功";
      let sql = "select * from userinfo where username=? and password=?";
      let data = [dobj.username, dobj.password];
      db(sql, data, callback => {
        console.log(callback);
      });
    }
    res.json(obj);
  });
};
// 注册
exports.register = (req, res) => {
  let dobj = req.body;
  let sql = "insert into userinfo set ?";
  db(sql, dobj, callback => {
    obj = {};
    if (callback.affectedRows === 1) {
      obj.message = "注册成功";
      obj.errcode = 0;
    } else {
      obj.errcode = 1;
    }
    res.json(obj);
  });
};
// 查询
exports.search = (req, res) => {
  let sql = "select * from books";
  let data = [];
  db(sql, data, callback => {
    if (callback) {
      obj.errcode = 0;
      obj.data = callback;
      res.json(obj);
    } else {
      obj.errcode = 1;
      obj.message = "查询失败";
      res.json(obj);
    }
  });
};
// 根据id查询单条数据 searchBoookById
exports.searchBookById = (req, res) => {
  let dobj = req.query;
  let sql = "select * from books where id = ?";
  let data = [dobj.id];
  db(sql, data, callback => {
    if (callback != "") {
      obj.errcode = 0;
      obj.data = callback[0];
    } else {
      obj.errcode = 1;
      obj.message = "查询失败";
    }
    res.json(obj);
  });
};
// 更新单条数据
exports.updateEdit = (req, res) => {
  let dobj = req.body;
  let sql =
    "update books set name=?,auther=?,category=?,descrption=? where id =?";
  let data = [dobj.name, dobj.auther, dobj.category, dobj.descrption, dobj.id];
  db(sql, data, callback => {
    if (callback.affectedRows === 1) {
      obj.errcode = 0;
      obj.message = "更新成功";
    } else {
      obj.errcode = 1;
      obj.message = "更新失败";
    }
    res.json(obj);
  });
};
// 删除数据
exports.deleteBook = (req, res) => {
  let dobj = req.query;
  let sql = "delete from books where id=?";
  let data = [dobj.id];
  db(sql, data, callback => {
    if (callback.affectedRows === 1) {
      obj.errcode = 0;
      obj.message = "删除成功";
    } else {
      obj.errcode = 1;
      obj.message = "删除失败";
    }
    res.json(obj);
  });
};
// 新增
exports.insertBooks = (req, res) => {
  let dobj = req.body;
  let sql = "insert into books set ?";
  db(sql, dobj, callback => {
    if (callback.affectedRows === 1) {
      obj.errcode = 0;
      obj.message = "新增成功";
    } else {
      obj.errcode = 1;
      obj.message = "新增失败";
    }
    res.json(obj);
  });
};
