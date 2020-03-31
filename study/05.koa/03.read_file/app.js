// 因为koa为一个构造函数对象 所以首字母大写
const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
// app.use(function (context) {
//   if (context.url === '/') {
//     // 异步的不能直接返回 需要使用async await promit
//     fs.readFile('./index.html', function (err, data) {
//       if (err) throw err
//       context.body = data.toString()
//     })
//   } else {
//     context.body = 'ok'
//   }
// })

function asyncReadFile () {

  return new Promise(function (resolve, reject) {
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        reject(err)
        return
      }
      console.log('pro');
      resolve(data.toString())
    })
  })
}

app.use(async function (context) {
  // 设置相应头 
  context.set('content-type', 'text/html;charset=utf-8')
  if (context.url === '/') {
    context.body = await asyncReadFile()
  } else {
    context.body = 'ok'  //koa返回数据会进行判断 如果是二进制数据（buffer）浏览器会进行下载
  }
})

app.listen(8888, () => {
  console.log('koa......');
})