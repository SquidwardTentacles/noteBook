// const express = require('express');
// const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));

// let server = app.listen(3000, '192.168.1.3', () => {
//   let host = server.address().address;
//   let port = server.address().port;
//   console.log('Example app listening on port 3000!', host, port);
// });

// const express = require('express');
// const app = express();
// // use 第一个参数可以添加一个虚拟目录
// // app.use('/abc', express.static('./static')).listen(3000, () => {
// //   console.log('running');
// // });
// app.use('/abc', express.static('./static'));
// app.use('/abcd', express.static('./public'));
// app.listen(3000, () => {
//   console.log('running');
// });

const express = require('express');
const app = express();
// app.use 可以监控所有的请求类型
app.use((req, res) => {
  res.send('ok');
});
// app.get('/', (req, res) => {
//   res.send('get data');
// });
// app.post('/', (req, res) => {
//   res.send('post data');
// });
// app.put('/', (req, res) => {
//   res.send('put data');
// });
// app.delete('/', (req, res) => {
//   res.send('delete data');
// });

app.listen(3000, () => {
  console.log('running');
});
