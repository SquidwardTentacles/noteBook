// 使用process.argv 可以拿到命令行参数 
let num1 = parseInt(process.argv[2])
let num2 = parseInt(process.argv[3])
let num3 = num1+num2
console.log('计算中...');
setTimeout(()=>{
    console.log('结果为'+num3);
    
},2000)
