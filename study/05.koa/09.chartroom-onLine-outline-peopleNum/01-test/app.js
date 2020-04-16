const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const session = require('koa-session')
const path = require('path')
const static = require('koa-static')

render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})
// socket.io无法携带cookie信息 手动创建对象保存信息 
global.mySessionstore = {}
// 循环遍历创建的session对象 如果找到了相同的用户信息就return 
function findSessionStore (socketid) {
  for (const key in global.mySessionstore) {
    let obj = global.mySessionstore[key]
    if (obj.socketid === socketid) {
      return obj
    }
  }
}
// 通过socketid查找key 通过key删除对应的信息
function findKeyBysocketid (socketid) {
  for (const key in global.mySessionstore) {
    if (global.mySessionstore[key].socketid === socketid) {
      return key
    }
  }
}

// socket
const IO = require('koa-socket')
const io = new IO()
io.attach(app)

io.on('connection', (ctx, data) => {
  console.log('连接上了');
  io.broadcast('msg1', '我是服务器来的')
})
io.on('login', ctx => {
  //  获取用户id 查找到用户信息后存储socketid 
  let id = ctx.data.id
  let socketid = ctx.socket.socket.id
  global.mySessionstore[id].socketid = socketid
  console.log('一个用户上线');
  io.broadcast('on_out_line', {
    online: global.mySessionstore
  })
  ctx.socket.on('disconnect', contxt => {
    console.log('一个用户下线');
    let id = contxt.socket.socket.id
    let key = findKeyBysocketid(id)
    delete global.mySessionstore[key]
    io.broadcast('on_out_line', {
      outline: global.mySessionstore
    })
  })

})
io.on('sendMsg', ctx => {
  console.log();
  let obj = findSessionStore(ctx.socket.socket.id)
  io.broadcast('allMessage', obj.username + '说' + ctx.data.inputValue)
  // io.broadcast('allMessage',)
})
// 接收私聊的消息 
io.on('sendPrivateMsg', data => {
  // ES6的解构赋值
  let { msg, privateTo } = data.data
  // 通过privateTo传来的socketid拿到用户名 这个函数返回一个对象 使用es6的解构赋值 拿到用户名
  let { username } = findSessionStore(data.socket.socket.id)
  // koa-socket 是socket.io的语法糖 app._io就是io对象 
  app._io.to(privateTo).emit('allMessage', `${username}对你说${msg}`)
})

// 加入组按钮 
io.on('joinGroup', ctx => {
  // console.log(, ctx.socket.socket.id);
  let group = ctx.data
  ctx.socket.socket.join(group)
})
// 显示群聊信息 
io.on('groupMsgSend', ctx => {
  let { groupName, groupMsg } = ctx.data
  // 向群发送消息 
  let socketid = ctx.socket.socket.id
  let { username } = findSessionStore(socketid)
  app._io.to(groupName).emit('allMessage', `${groupName === 'male' ? '男生组' : '女生组'}${username}说${groupMsg}`)
})
// socket

router.get('/', async ctx => {
  ctx.render('index')
})
  .post('/login', async ctx => {
    // 保存用户名以及一个时间戳给session 时间戳作为以后查找用户名的id
    let username = ctx.request.body.username
    ctx.session.user = { username }
    let id = Date.now()
    ctx.session.user.id = id
    // 将用户名存储到新建的session对象中
    global.mySessionstore[id] = { username }
    // console.log(global.mySessionstore);

    ctx.redirect('/list')
  })
  .get('/list', async ctx => {
    // console.log(ctx.session.user);

    ctx.render('list', {
      id: ctx.session.user.id,
      username: ctx.session.user.username
    })
  })

app.keys = ['test']
let store = {
  storeage: {},
  get (key) {
    return this.storeage[key]
  },
  set (key, value) {
    this.storeage[key] = value
  },
  destory (key) {
    delete this.storeage[key]
  }
}

app.use(session(store, app))
app.use(bodyparser())
app.use(static(path.resolve('./public')))
app.use(router.routes())

app.listen(9999, () => {
  console.log('running....');

})