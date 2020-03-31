// 引入koa （构造函数对象）
const Koa = require('koa')
const server = new Koa()
server.use(function (content) {
  content.body = 'koa ok'
})

server.listen(8888, () => {
  console.log('koa server');

})
