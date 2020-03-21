const path = require('path')
// 文件路径的拼接
let myPath = path.join(__dirname,'adc','def.js')

console.log(myPath);
// 将文件路径转换为对象格式 
let pathObj = path.parse(myPath)
console.log(pathObj);
// 更改文件后缀 一般直接更改对象中base字段 
pathObj.base = 'def.txt'
// 接收路径对象装换为路径字符串 
myPath = path.format(pathObj)
console.log(myPath);


