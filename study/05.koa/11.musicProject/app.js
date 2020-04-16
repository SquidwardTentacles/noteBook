const Koa = require('koa')
const app = new Koa()
const render = require('koa-art-template')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const musicRouter = require('./routers/music')
const userRouter = require('./routers/user')

render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})


app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/public')) {
    ctx.url = ctx.url.replace('/public', '')
  }
  await next()
})
app.listen(8888, () => {
  console.log('running...');

})
app.use(static('./public'))
app.use(bodyparser())
app.use(musicRouter.routes())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

