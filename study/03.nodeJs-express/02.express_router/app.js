// 路由中间件 
const express = require('express')
const app = express()
// 获取路由级中间件对象
const router = express.Router()
// 配置路由规则 router.get/post(请求方式)(URL,fn())
// fn()中的参数有 req,res,next

router.get('/login',(req,res)=>{
    res.end('login')
})
.get('/register',(req,res)=>{
    res.end('register')
})
// 将router添加到应用
app.use(router)

app.listen(8888,()=>{
    console.log('路由级中间件');
    
})