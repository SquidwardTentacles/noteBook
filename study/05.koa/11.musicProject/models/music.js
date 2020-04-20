const db = require('./db')

module.exports = {
  // 新增音乐
  musicAdd: async (args) => await db.q(`insert into music(title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)`, Object.values(args)),
  // 更新音乐 
  uploadMusic: async (args) => await db.q(`update music set title=?, singer=?, time=?, file=?, filelrc=?, uid=? where id=?`, Object.values(args))
}