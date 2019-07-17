// // 中间件

// const express = require('express');
// const app = express();
// // 声明变量记录访问次数
// let total = 0;

// app.use('/user', (req, res, next) => {
//   // 记录访问时间
//   console.log(Date.now());
//   // next 方法的作用就是把请求传递到下一个中间件
//   next();
// });
// app.use('/user', (req, res, next) => {
//   // 记录访问数量
//   total++;
//   console.log(total);
//   next();
// });
// app.use('/user', (req, res, next) => {
//   // 记录访问日志
//   console.log('访问');
//   res.send('result');
// });

// app.listen(3000, () => {
//   console.log('running');
// });

//  中间件的挂载方式
// const express = require('express');
// const app = express();

// app.get(
//   '/abc',
//   (req, res, next) => {
//     console.log(1);
//     next('route');
//   },
//   (req, res) => {
//     console.log(2);
//     res.send('abc');
//   }
// );
// app.get('/abc', (req, res) => {
//   console.log(3);
//   res.send('df');
// });
// app.listen(3000, () => {
//   console.log('running...');
// });

// 应用中间件 第三方中间件 body-parser
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

// 挂载内置中间件
app.use(express.static('public'));
// 挂载参数处理中间件(处理post提交数据)
app.use(bodyparser.urlencoded({ extended: false }));
// 处理json格式的请求数据
app.use(bodyparser.json());
let func = (obj, res) => {
  if (obj.username == 'admin' && obj.password == 123) {
    res.send('login success');
  } else {
    res.send('error');
  }
};
// 处理post请求参数
app.post('/login', (req, res) => {
  let sessondata = req.body;
  func(sessondata, res);
  // if (sessondata.username == 'admin' && sessondata.password == 123) {
  //   res.send('login success');
  // } else {
  //   res.send('error');
  // }
});

// get请求 框架已经转换了get请求参数
app.get('/loginget', (req, res) => {
  let getData = req.query;
  console.log(getData);
  func(getData, res);
});

app.listen(3000, () => {
  console.log('running...');
});
