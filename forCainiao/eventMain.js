// var events = require('events');
// var eventEmitter = new events.EventEmitter();
// // 监听器
// var listener1 = function listener1() {
//   console.log('listener1执行');
// };
// var listener2 = function listener2() {
//   console.log('listener2执行');
// };
// // 绑定connection事件 处理函数为listener1
// eventEmitter.addListener('connection', listener1);
// eventEmitter.on('connection', listener2);
// var eventListeners = eventEmitter.listenerCount('connection');
// console.log(eventListeners + '个监听器监听连接事件');
// // 处理connection事件
// eventEmitter.emit('connection');
// // 移除绑定的listener1函数
// eventEmitter.removeListener('connection', listener1);
// console.log('listener1不再受监听');
// // 触发连接事件
// eventEmitter.emit('connection');
// eventListeners = eventEmitter.listenerCount('connection');
// console.log(eventListeners + '个监听器连接事件');
// console.log('over');

var event = require('events');
var eventEmitter = new event.EventEmitter();
// 声明监听器
var listener1 = () => {
  console.log('listen1');
};
var listener2 = () => {
  console.log('liostener2');
};
// 绑定事件
eventEmitter.addListener('connection', listener1);
eventEmitter.on('connection', listener2);
// 查看监听器调用数量
var eventListener = eventEmitter.listenerCount('connection');
console.log(eventListener);
eventEmitter.emit('connection');
// 移除事件
eventEmitter.removeListener('connection', listener1);
console.log(eventEmitter.listenerCount('connection'));
eventEmitter.emit('connection');