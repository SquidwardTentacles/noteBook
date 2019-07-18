// 加载数据库驱动
var mysql = require('mysql');
// 创建数据库连接
var connection = mysql.createConnection({
  host: 'localhost', //数据库所在的域名或者ip地址
  user: 'root', //登录数据库的账号
  password: 'root', //登录数据库的密码
  database: 'mybook' //操作的表的名称
});
// 执行造作
connection.connect();
// 操作数据库 SELECT 1 + 1 AS solution验证数据库是否能正常连接
// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
connection.query('select count(*) as total from books', function(
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log('表中共有数据', results[0].total + '条数据');
});
// 关闭数据库
connection.end();
