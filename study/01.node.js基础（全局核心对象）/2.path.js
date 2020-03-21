// 全局核心对象 path
const path = require('path')
// path.join一般用于文件路径的拼接 path.resolve用于相对路径转绝对路径
const curPath = path.join(__dirname,'//name//','dirname')
console.log(curPath);

const str = 'abc/def.js'
let filePath = path.resolve(__dirname,str)
console.log(filePath);

