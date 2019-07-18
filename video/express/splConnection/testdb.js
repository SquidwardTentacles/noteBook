// 引入模块
const sqlOperation = require('./db');
// 新增
// let sql = 'insert into books set ?';
// let data = {
//   name: '红楼梦',
//   auther: '曹雪芹',
//   category: '文学',
//   descrption: '封建王朝的缩影'
// };
// sqlOperation.base(sql, data, result => {
//   console.log(result);
// });
// 修改
// let sql = 'update books set name=?,auther=?,category=?,descrption=? where id=?';
// let data = ['天龙八部', '金庸', '武侠', '武侠小说', 3];
// sqlOperation.base(sql, data, callback => {
//   console.log(callback);
// });
// 删除
// let sql = 'delete from books where id=?';
// let data = [3];
// sqlOperation.base(sql, data, callback => {
//   console.log(callback);
// });
// 查询
// let sql = 'select * from books where id=?';
// let data = [5];
// sqlOperation.base(sql, data, callback => {
//   console.log(callback);
// });
