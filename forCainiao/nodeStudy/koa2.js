// 导入 koa2.0 与koa1.0 不同 在2.0中 我们导入的是一个class 因此用大写的Koa表示
const Koa = require('Koa');
// 创建一个koa对象表示web App本身
const app = new Koa();
// 对于任何请求 app将调用该异步函数处理请求
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = `<h1>hello koa2</h1>`;
});
// 监听端口3000
app.listen(3000);
console.log('serve run');
