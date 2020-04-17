const db = require('./db')
module.exports = {
  // 查询用户是否注册
  userRegister: async (username) => await db.q('select 1 from user where username = ?', [username]),
  //用户注册
  doRegister: async (...args) => {
    // console.log(args);
    let str = ''
    for (let i = 0; i < args.length; i++) {
      str += '?,'
    }
    // 删除最后一个逗号
    str = str.substr(0, str.length - 1);
    // ...args对象展开运算符会将对象转化为数组 
    let status = await db.q(`insert into user(username,password,email) values(${str})`, args)
    return status.affectedRows
  },
  // 用户登录 
  doLogin: async (...args) => await db.q(`select * from user where username = ? and password = ?`, args)

}