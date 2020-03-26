const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res, next) => {
  next(err)
}).all('*', (req, res) => {
  res.send('页面出错')
})

app.use(router)
app.listen(8888, () => {
  console.log('listen........');

})
// 错误处理程序4个参数 错误优先 一般将错误处理函数放在页面逻辑的最后
app.use((err, req, res, next) => {
  res.send('<h1>访问的页面丢失</h1>')
})