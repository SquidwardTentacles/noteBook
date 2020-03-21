// 引入express框架 会自动逐级向上查找 直到找到node_moduls/express
const express = require('express')
// 构建一个服务
const app = express()
// 开启监听
app.listen(8888,()=>{
    console.log('监听8888');
    
})
// 处理相应
// app.use(fn()) //应用中间件 
// app.use(router) //路由中间件
app.use((req,res,next)=>{
    // res.end('hello word')
    console.log('hello'); //会有两次请求 网站图标一次 正常请求一次
    
    next() //放行开关
})

app.use((req,res)=>{
    res.end('next hello word')
    // next()
})