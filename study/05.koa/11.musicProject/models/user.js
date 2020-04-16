const db = require('./db')
module.exports = {
  showUser: async () => {
    return await db.q('select * from goodsinfo where id = ?', [98])
    // console.log(backdata);
  }
}