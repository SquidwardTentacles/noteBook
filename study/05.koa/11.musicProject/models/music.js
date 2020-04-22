const db = require('./db')

module.exports = {
  // 新增音乐
  musicAdd: async (args) => await db.q(`insert into music(title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)`, Object.values(args)),
  // 更新音乐 
  uploadMusic: async (args) => await db.q(`update music set title=?, singer=?, time=?, file=?, filelrc=?, uid=? where id=?`, Object.values(args)),
  // 删除音乐
  deleteMusic: async (id) => await db.q('delete from music where id =?', [id]),
  // 编辑查找对应的音乐
  musicEdit: async (id) => await db.q('select * from music where id = ?', [id]),
  // 根据uid查找音乐
  selectMusicByuid: async uid => await db.q('select * from music where uid = ?', [uid])
}