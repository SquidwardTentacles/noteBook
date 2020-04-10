const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const session = require('koa-session')
const static = require('koa-static')
const path = require('path')

let msgs = [
  { name: '小红', message: '哈哈哈' },
  { name: '小明', message: '嘻嘻嘻' },
  { name: '小蓝', message: '呵呵呵' },
]
// 全局变量 global 声明一个对象用来存储用户信息 
global.mySessioonstore = {}
// 声明一个方法通过id查找对印的用户信息
function findBySocketId (socketid) {
  for (const tempstap in global.mySessioonstore) {
    let obj = global.mySessioonstore[tempstap]
    if (obj.socketid === socketid) {
      return obj
    }
  }
}

// webSocet
const IO = require('koa-socket')
const io = new IO()

io.attach(app) //附加到app产生关联

io.on('connection', (content) => {
  console.log('链接上一个')
  io.broadcast('msg1', '我是服务器来的')
})

// 接收用户消息 
io.on('sendMsg', context => {
  // console.log('消息', context.data.newContent);
  console.log('当前的socketid', context.data.newContent);
  // 查找对象的用户 
  let obj = findBySocketId(context.socket.socket.id)
  // 广播给所有人 
  io.broadcast('allmessage', obj.username + '对所有人说' + context.data.newContent)

})
// 处理登录信息
io.on('login', context => {
  let id = context.data.id
  global.mySessioonstore[id].socketid = context.socket.socket.id
})
// webSocet

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
    //1. 生成时间戳将时间戳响应给客户端（类似cookie）
    let id = Date.now()
    ctx.session.user.id = id
    //2. 将id保存到自己的sessionStore中 
    global.mySessioonstore[id] = {
      username
    }
    // 重定向到聊天室
    ctx.redirect('/list')
    // ctx.render('list', {
    //   username: ctx.request.body.username,
    //   list
    // })
  })
  .get('/list', ctx => {
    // 3.接着就可以使用了 
    ctx.render('list', {
      username: ctx.session.user.username,
      id: ctx.session.user.id,
      msgs
    })
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
    delete this.storage[key]
  }
}
app.use(session({ store }, app))
app.use(bodyparser())
app.use(router.routes())

app.listen(9999, () => {
  console.log('listen.......');

})