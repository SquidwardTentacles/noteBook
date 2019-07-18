// 查询
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
// 查询所有
let sql = 'select * from books where id=?';
let data = [1];
connection.query(sql, data, function(error, results, fields) {
  if (error) throw error;
  console.log(results);
});
// 关闭数据库
connection.end();
