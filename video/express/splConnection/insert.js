// 插入数据
// 加载数据库驱动
const mysql = require('mysql');
// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost', //数据库所在的域名或者ip地址
  user: 'root', //登录数据库的账号
  password: 'root', //登录数据库的密码
  database: 'mybook' //操作的表的名称
});
// 执行造作
connection.connect();
let sql = 'insert into books set ?';
let data = {
  name: 'a',
  auther: 'b',
  category: 'c',
  descrption: 'd'
};
connection.query(sql, data, function(error, results, fields) {
  if (error) throw error;
  if (results.affectedRows == 1) {
    console.log('数据插入成功');
  }
});
// 关闭数据库
connection.end();
