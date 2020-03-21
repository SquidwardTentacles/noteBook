// 文件的读写操作 使用node的核心模块 fs 完成 
const fs = require('fs')

// 文件的读 fs.readFile('文件路径'，文件输出格式（可选 不写默认buffer格式输出），回调函数)
fs.readFile('./file.txt',(err,data)=>{
    // if(err) throw err ;
    // 需要获取字符串数据就调用Buffer篮子 .toString(编译格式)
    console.log(data.toString('utf8'));
    
})
// fs.readFile('./file.txt','utf8',(err,data)=>{
//     // if(err) throw err ;
//     console.log(data);
    
// })
// fs.writeFile('文件路径'，‘写入内容’，{flag:a}可选操作 a -》append 追加写入，回调函数)
// fs.writeFile('./file.txt','我今天赚了一块钱',(err)=>{
//     if(err) throw err 
//     console.log('文件写入完成');
// })
// 可以追加写入文件
fs.appendFile('./file.txt','我今天赚了一块钱',(err)=>{
    if(err) throw err 
    console.log('文件写入完成');
    
})