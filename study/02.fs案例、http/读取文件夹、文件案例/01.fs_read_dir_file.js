// 接收命令行参数 根据该目录 读取目录下的所有文件并输出（遍历文件夹）
// 引入相关核心模块 
const path = require('path')
const fs = require('fs')
// 接收命令行参数 修正命令行参数中的路径 process为内置对象 不需要引入 直接使用即可
let inputPath = path.resolve(process.argv[2])

function testReadFile(dir) {
    // 判断该路径是否存在 fs.access(file,fs.constant.F_OK,回调函数)
    try {
        // 如果可访问性检查失败，则抛出 Error。 否则，该方法将返回 undefined
        fs.accessSync(dir, fs.constants.F_OK)
        let state = fs.statSync(dir)
        if(state.isFile()) {
            // 如果是文件 就输出该目录 
            console.log(dir);
            
        }else if(state.isDirectory) {
            let files = fs.readdirSync(dir)
            if(files.length) {
                files.forEach(file=> {
                    testReadFile(path.join(dir,file))
                })
            }else {
                console.log('文件夹为空');
                
            }
        }
        
    } catch (e) {
        console.log(e);
        console.log('该文件或文件夹不存在');
        
        
    }
}

testReadFile(inputPath)