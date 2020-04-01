const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const router = new Router()

app.use(bodyParser())
router.get('/', async ctx => {
  ctx.body = '首页'
}).post('/post', async ctx => {
  ctx.body = ctx.request.body
})

app.use(router.routes()) //将路由与实例挂钩

/*
  优化状态码的处理405和501 不再是全部的404 
  405 代表请求url有 但是没有写该请求方式的响应 
  501 服务器不支持该请求方式
*/
app.use(router.allowedMethods())

app.listen(8888, () => {
  console.log('listen......');

})