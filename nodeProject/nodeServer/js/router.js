const express = require("express");
const router = express.Router();
const service = require("./service");
// 登录
router.post("/login", service.login);
// 注册
router.post("/register", service.register);
// 查询数据
router.get("/search", service.search);
// 导出路由
module.exports = router;
