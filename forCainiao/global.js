// filename 正在执行的脚本的文件名
// console.log(__filename);
// dirname 当前执行脚本所在的文件脚本所在的文件目录
// console.log(__dirname);
// setTimeout(cd,ms) 全局函数在指定的毫秒数后执行指定函数cd 并且只执行一次指定函数 返回一个代表定时器的句柄值
// clearTimeont(t) 清空通过setTimeout创建的计时器
// function printHello() {
//   console.log('hello word');
// }
// var t = setTimeout(printHello, 1000);
// clearTimeout(t);
// console.log('clear');
// setInterval(cd,ms) 在指定的毫秒数后执行函数 使用clearInterval(t) 清除计时器
// var id = 0;
// function printhello() {
//   console.log('interval');
//   id++;
// }
// var t = setInterval(printhello, 1000);
// clearInterval(t);
// console.log('clear');
// process 描述当前node.js进程状态对象 exit 当前进程准备退出时触发
// beforeExit
process.on('exit', function() {
  // 一下代码永远不会执行
  setTimeout(function() {
    console.log('改代码不会执行');
  }, 500);
  console.log('退出 code');
});
console.log('执行结束');
