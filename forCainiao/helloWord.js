// 引入event模块
var events = require('events');
// 创建eventEmitter对象
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序
var conectHandler = function connected() {
  console.log('连接成功');
  // 触发事件
  eventEmitter.emit('data_received');
};
// 绑定connection事件处理程序
eventEmitter.on('connection', conectHandler);
// 使用匿名函数绑定data_received事件
eventEmitter.on('data_received', function() {
  console.log('接收成功');
});
// 触发connection事件
eventEmitter.emit('connection');
console.log('over');
