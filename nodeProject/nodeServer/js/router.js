const express = require("express");
const router = express.Router();
const service = require("./service");
// 登录
router.post("/login", service.login);
// 注册
router.post("/register", service.register);
// 查询数据
router.get("/search", service.search);
// 查询单条数据
router.get("/searchBookById", service.searchBookById);
// 更新数据`
router.put("/updateEdit", service.updateEdit);
// 删除数据
router.delete("/deleteBook", service.deleteBook);
// 新增数据
router.put("/insertBooks", service.insertBooks);
// 导出路由
module.exports = router;
