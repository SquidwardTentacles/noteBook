\*\*\*MVC
M(model 模型 典型 样式 )V( view 视图)C( controllers 控制)
C 将操作分发给 model model 将数据传递给 view 视图进行展示
应用进入 app.js 然后进入相关路由 相关路由发起相应 进入 controller 如果需要展示数据就在 nodel 调用相关模块 由模块返回数据 数据返回 controllers 展示视图（ctx.render()）

middleware 文件夹 自己的中间件存储目录 包含重写 url 以及错误处理

config.js 一些相关的设置
