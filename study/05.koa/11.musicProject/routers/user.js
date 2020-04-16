const Router = require('koa-router')
const userRouter = new Router()
const db = require('../models/db')
const controllerUser = require('../controllers/user')

userRouter.get('/user/register', controllerUser.register)
  .get('/user/login', controllerUser.login)

module.exports = userRouter