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
