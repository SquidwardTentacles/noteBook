const Koa = require('koa')
const app = new Koa()

app.use(function (context, next) {
  // console.log(context.request.url);
  // console.log(context.request.method);
  // console.log(context.request.headers);
  console.log(context.url);
  console.log(context.method);
  console.log(context.headers);
  // 放行
  next()
})
app.use(function (ctx) {
  // ctx.response.set('mytest', '12345')
  // ctx.response.status = 201
  // ctx.response.body = '<h1>hello</h1>'
  ctx.set('mytest', '12345')
  ctx.status = 201
  ctx.body = '<h1>hello</h1>'
})

app.listen(8888, () => {
  console.log('服务启动在8888');

})