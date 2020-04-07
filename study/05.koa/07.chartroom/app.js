const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const session = require('koa-session')
const static = require('koa-static')
const path = require('path')

let list = [
  { name: '小红', message: '哈哈哈' },
  { name: '小明', message: '嘻嘻嘻' },
  { name: '小蓝', message: '呵呵呵' },
]

render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

router.get('/', async (ctx) => {
  await ctx.render('login')
})
  .post('/login', ctx => {
    let { username, password } = ctx.request.body
    // 不验证 直接挂在session
    ctx.session.user = {
      username
    }
    ctx.render('list', {
      username: ctx.request.body.username,
      list
    })
  })
  .post('/add', async ctx => {
    // console.log(ctx.session.user);

    // console.log(ctx.request.body);
    // ajax会帮我们携带cookie信息
    let obj = {
      name: ctx.session.user.username,
      message: ctx.request.body.msg
    }
    list.push(obj)
    console.log(list);
    ctx.body = list
  })

app.keys = ['test']
let store = {
  storage: {},
  get (key) {
    return this.storage[key]
  },
  set (key, session) {
    this.storage[key] = session
  },
  destroy (key) {
    delete this.storeage[key]
  }
}
app.use(session({ store }, app))
app.use(bodyparser())
app.use(router.routes())

app.listen(8888, () => {
  console.log('listen.......');

})