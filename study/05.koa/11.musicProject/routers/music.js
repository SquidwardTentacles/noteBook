const Router = require('koa-router')
const musicRouter = new Router()
const musicControlles = require('../controllers/music')

musicRouter.get('/music/index', musicControlles.index)
  .get('/music/edit', musicControlles.edit)
  .get('/music/add', musicControlles.add)
  // 添加音乐的接口 
  /**
   * title,
   * singer:歌手,
   * time,
   * file:歌曲文件，
   * filelrc:歌词文件
   */
  .post('/music/add-music', musicControlles.addMusic)
  // 更新音乐
  .put('/music/upload-music', musicControlles.uploadMusic)
  .delete('/music/delete-music', musicControlles.deleteMusic)

module.exports = musicRouter