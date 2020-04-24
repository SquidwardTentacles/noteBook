const Koa = require('koa')
const app = new Koa()
const render = require('koa-art-template')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const { port, templateConfig, staticConfig, sessionStore, uploadDir } = require('./config')
const session = require('koa-session')
const formidable = require('koa-formidable')
const musicRouter = require('./routers/music')
const userRouter = require('./routers/user')
// 模板的设置综合到config
render(app, templateConfig)

// 优雅的处理错误
app.use(require('./middleware/error.js')())
// 给static重写url （此静态资源为public文件夹之下的文件 页面引用时 不需要写public路径 为了能够携带public 这里拦截带有public的路径 将public替换为空）
let reWriteUrl = require('./middleware/rewriteurl')
app.use(reWriteUrl(require('./reWriteConfig')))

// 处理文件及字符串
app.use(formidable({
  // 设置上传目录，否则在用户的temp目录下
  uploadDir: uploadDir,
  // 默认根据文件算法生成hash字符串（文件名），无后缀
  keepExtensions: true
}));

app.keys = ['test']
// 基于test字符串进行签名的运算，为的是保证数据不被串改
app.use(session({ store: sessionStore }, app))
app.use(static(staticConfig))
app.use(bodyparser())
app.use(musicRouter.routes())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


app.listen(port, () => {
  console.log('running...' + port);

})