
socket.on("msg1", function (data) {
  console.log(data);
});

socket.on('allMessage', function (data) {
  let str = `<li>${data}</li>`
  document.getElementById('msgBox').innerHTML += str
})
// 声明一个私聊的id
var privateTo = ''
socket.on('on_out_line', data => {
  // 将对象转为数组
  let arr = Object.values(data.online)
  let str = ``
  privateTo = arr[0].socketid
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    str += `<option value="${element.socketid}">${element.username}</option>`
  }
  document.getElementById('peoNum').innerText = '当前在线人数 : ' + arr.length
  document.getElementById('onlinePeo').innerHTML = str
})
// 发送私聊的消息
let sendBtn = document.getElementById('sendBtn')
sendBtn.onclick = function () {
  let value = document.getElementById('sendMsg').value
  socket.emit('sendPrivateMsg', {
    msg: value,
    privateTo
  })
}
// 发送群聊消息
let btn = document.getElementById('btn')
btn.onclick = function () {
  socket.emit('sendMsg', {
    inputValue: document.getElementById('inputValue').value
  })
}

// 群聊 声明一个群聊id 保存当前用户信息是发送给哪个群 
let groupName = ''
// 男生组按钮 
let male = document.getElementById('male')
male.onclick = function () {
  groupName = 'male'
  socket.emit('joinGroup', groupName)
}
// 女生组
let famale = document.getElementById('famale')
famale.onclick = function () {
  groupName = 'famale'
  socket.emit('joinGroup', groupName)
}
// 群聊按钮 发送消息 
let sendGroupMsg = document.getElementById('sendGroupMsg')
sendGroupMsg.onclick = function () {
  let groupMsg = document.getElementById('groupMsg').value
  socket.emit('groupMsgSend', { groupName, groupMsg })
}

socket.on("disconnect", () => {
  console.log("断开链接");
});