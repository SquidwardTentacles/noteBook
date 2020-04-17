const path = require('path')
module.exports = {
  // 链接mysql数据库的相关设置
  dbConfig: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'music-pro'
  },
  // 设置服务器端口
  port: 8888,
  // 模板的设置
  templateConfig: {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  },
  // 静态资源文件的目录
  staticConfig: path.resolve('./public'),
  // koa-session store存储库
  sessionStore: {
    storage: {},
    get (key) {
      return this.storage[key]
    },
    set (key, value) {
      this.storage[key] = value
    },
    destroy (key) {
      delete this.storage[key]
    },
  },
  uploadDir: './public/files'
}