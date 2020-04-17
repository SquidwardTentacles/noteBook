const Router = require('koa-router')
const musicRouter = new Router()
const musicControlles = require('../controllers/music')

musicRouter.get('/', ctx => ctx.redirect('/music/index'))
  .get('/music/index', musicControlles.index)
  .get('/music/edit', musicControlles.edit)
  .get('/music/add', musicControlles.add)
  // 添加音乐的接口 
  .post('/music/add-music', musicControlles.addMusic)

module.exports = musicRouter