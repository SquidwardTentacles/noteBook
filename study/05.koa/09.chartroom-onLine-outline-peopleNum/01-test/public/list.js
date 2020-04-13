
socket.on("msg1", function (data) {
  console.log(data);
});
let btn = document.getElementById('btn')
btn.onclick = function () {

  socket.emit('sendMsg', {
    inputValue: document.getElementById('inputValue').value
  })
}
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
let sendBtn = document.getElementById('sendBtn')

sendBtn.onclick = function () {
  let value = document.getElementById('sendMsg').value
  socket.emit('sendPrivateMsg', {
    msg: value,
    privateTo
  })
}

socket.on("disconnect", () => {
  console.log("断开链接");
});