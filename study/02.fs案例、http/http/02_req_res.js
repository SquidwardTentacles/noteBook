const http = require('http')
let serve = http.createServer()

// 请求相关
// serve.on('request',(req,res)=>{
//     console.log(req.headers); //请求头
//     console.log(req.url);//请求行
//     console.log(req.method);//请求行
//     // 请求体
//     req.on('data',data=>{
//         console.log(data.toString());//写入到响应体
        
//     })
//     res.end('hello')
// })

// 响应相关
serve.on('request',(req,res)=> {
    // 写头 分为一次性写和多次性写 一次性写必须在多次后面
    res.setHeader('a','a')
    res.setHeader('b','b')
    res.setHeader('c','c')
    // 一次性写
    // res.setHeader(500,{'d':'d'})
    // 写行
    res.writeHead(200,{'content-type':'text/html;charset=utf8'})
    // 写体 一次性写和多次性写 一次性写需要在多次后面
    res.write('床前明月光')
    res.write('疑是地上霜')
    res.write('举头望明月')
    // 一次性写 
    res.end('低头思故乡')
})

serve.listen(8888,()=>{
    console.log('启动');
    
})