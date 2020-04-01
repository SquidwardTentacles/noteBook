const Koa = require('koa')
const app = new Koa()
const router = new require('koa-router')()
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template')
const path = require('path')
const session = require('koa-session')

render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async (ctx, next) => {
  await ctx.render('index')
}).post('/login', async (ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  if (username !== 'admin' || password !== '123') {
    ctx.throw(200, '账号或密码错误')
  } else {
    // 保存session 
    ctx.session.user = {
      username
    }
    ctx.body = '登录成功'
  }
}).get('/user', async ctx => {
  ctx.body = '当前登录用户为' + ctx.session.user.username
})

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', //sesson名
  maxAge: 86400000,//过期时间
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true,//false时 客户端可以操作cookie
  httpOnly: true, //不允许在客户端操作cookie
  signed: true, /** 数字签名 保证数据不被篡改 */
  rolling: false, /** 过期时间访问顺延*/
  renew: false, /** 过期之后是否创建一个新的cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));


app.use(bodyParser())
app.use(router.routes())

app.listen(8888, () => {
  console.log('listen.......');

})