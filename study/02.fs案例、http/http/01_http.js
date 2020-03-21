// // 引入核心对象
// const http = require('http')
// // 创建服务器 
// let server = http.createServer()

// server.on('request',(req,res)=>{
//     // 返回信息
//     res.end('xxx')
// })

// // IP找计算机 端口找程序 
// server.listen(8888,()=>{
//     console.log('服务启动');
    
// })

const http = require('http')
let server = http.createServer()
server.on('request',(req,res)=>{
    res.end('xxxx')
})
server.listen(8888,()=>{
    console.log('服务器启动');
    
})