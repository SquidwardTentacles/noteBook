const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
const path = require('path')
const render = require('koa-art-template');
const static = require('koa-static')

render(app, {
  // 静态资源文件夹的目录
  root: path.join(__dirname, 'view'),
  // 静态文件的后缀名
  extname: '.html',
  // 
  debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async ctx => {
  await ctx.render('index.html')
})

app.use(static(path.resolve('./public')))

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(8888, () => {
  console.log('listen...');

})