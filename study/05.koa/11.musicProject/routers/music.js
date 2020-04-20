const Router = require('koa-router')
const musicRouter = new Router()
const musicControlles = require('../controllers/music')

musicRouter.get('/music/index', musicControlles.index)
  .get('/music/edit', musicControlles.edit)
  .get('/music/add', musicControlles.add)
  // 添加音乐的接口 
  .post('/music/add-music', musicControlles.addMusic)
  // 更新音乐
  .put('/music/upload-music', musicControlles.uploadMusic)

module.exports = musicRouter