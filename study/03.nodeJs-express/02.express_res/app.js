const express = require('express')
const app = express()
const router = express.Router()

router.get('/json',(req,res)=>{
    // res.end 只能相应字符串 和 读文件返回的data（buffer数据） 
    res.json([{name:'jack',age:'44'}])
}).get('/redirect',(req,res)=>{
    res.redirect('https://www.baidu.com')
})

app.use(router)

app.listen(8888,()=>{
    console.log('res');
    
})