const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template')
const session = require('koa-session')
const static = require('koa-static')
const path = require('path')

let msgs = [
  { name: '小红', message: '哈哈哈' },
  { name: '小明', message: '嘻嘻嘻' },
  { name: '小蓝', message: '呵呵呵' },
]
global.mySessionstore = {}
function findBySocketId (socketid) {
  for (const tempstap in global.mySessionstore) {
    let obj = global.mySessionstore[tempstap]
    if (obj.socketid === socketid) {
      return obj
    }
  }
}

// socket
const IO = require('koa-socket')

const io = new IO()

io.attach(app)

io.on('connection', (content) => {
  console.log('连接上了a');
  io.broadcast('msg1', '我是服务器来的')
})
// 接受用户信息
io.on('sendMsg', (context) => {
  let obj = findBySocketId(context.socket.socket.id)
  // 广播给所有人 
  io.broadcast('allmessage', obj.username + '对所有人说' + context.data.newContent)
})
// 处理登录 
io.on('login', context => {
  let ids = context.data.id
  let obj = { socketid: context.socket.socket.id, username: global.mySessionstore[ids].username }
  global.mySessionstore[ids] = obj
  console.log(global.mySessionstore, 'ffff');
})
// socket


render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});


router.get('/', async ctx => {
  ctx.render('index')
})
  .post('/login', ctx => {
    // es6的结构赋值
    let { username, password } = ctx.request.body
    // 没有验证用户名 密码 直接挂在session
    ctx.session.user = { username }
    // 生成时间戳作为查找用户信息的id
    let id = Date.now()
    ctx.session.user.id = id
    // 将id保存到对象中 
    global.mySessionstore[id] = { username: username }
    // 重定向到聊天室 
    ctx.redirect('/list')
  })
  .get('/list', ctx => {
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
app.use(bodyParser())
app.use(router.routes())

app.listen(9999, () => {
  console.log('running');

})