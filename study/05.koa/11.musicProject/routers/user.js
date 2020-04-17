const Router = require('koa-router')
const userRouter = new Router()
const db = require('../models/db')
const controllerUser = require('../controllers/user')

userRouter.get('/user/register', controllerUser.register)
  .post('/user/do-register', controllerUser.doRegister)
  .get('/user/login', controllerUser.login)
  .post('/user/do-login', controllerUser.doLogin)

module.exports = userRouter