// const express = require('express')
// const app = express()
// const router = express.Router()

// // - - 注册一个模板引擎
// //     - app.engine('.html',express-art-template);
// app.engine('.html',require('express-art-template'))
// //       - 设置默认渲染引擎app.set('view engine','.html');
// app.set('view engine','.html')
// //   - res.render(文件名,数据对象);
// //   - express这套使用，默认在当前app.js同级的views目录查找

// router.get('/hero-list',(req,res)=>{
//     res.render('hero-list.html',{
//         heros:[{name:'吕布'}]
//     })
//     // res.end('hero-list')
// })

// app.use(router)

// app.listen(8888,()=>{
//     console.log('hero-list_server');

// })

const express = require('express')
const app = express('view engine', '.html')
const router = express.Router()
const fs = require('fs')

// 注册模板引擎 
app.engine('.html', require('express-art-template'))
// 配置默认的渲染引擎
app.set('view engine', '.html')
// 区分开发与生产环境
app.set('view options', {
  // 判断计算机中的环境变量 NODE_ENV字段
  debug: process.env.NODE_ENV !== 'production',
  // debug模式 不压缩 不混淆代码 实时更新数据
  imports: {
    // 数据的导入和过滤的操作
    num: 1,
    reverse: function (str) {
      return '^_^' + str + '^_^'
    }
  }
});
router.get('/hero-list', (req, res, next) => {

  res.render('hero-list', {
    heros: [{ name: '吕布' }]
  })
})

app.use(router)

app.listen(8888, () => {
  console.log('监听开始');

})
