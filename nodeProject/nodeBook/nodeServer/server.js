const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./js/router");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type, Authorization"
//   );
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.header("cache-control", "no-cache");
  res.header("content-type", "application/json; charset=utf-8");
  res.header("ETag", "");
  //header头信息设置结束后，结束程序往下执行，返回
  if (req.method.toLocaleLowerCase() === "options") {
    res.status(204);
    return res.json({}); //直接返回空数据，结束此次请求
  } else {
    next();
  }
});

app.use(router);

app.listen(3100, "192.168.1.7", () => {
  console.log("running");
});
// 添加supervisor插件 启用node热更新功能 运行命令supervisor node . 或者supervisor 文件名.js
