const Router = require('koa-router')
const userRouter = new Router()
const db = require('../models/db')
const controllerUser = require('../controllers/user')
/*
 username:username,
 //  如果password有值就注册用户 如果没有就是查询用户是否注册
 password:password,
 email:email,
 */
userRouter.get('/user/register', controllerUser.register)
  /*
   *{
     username:username,
     paessword:password,
     email:email
   } 
   */
  .post('/user/do-register', controllerUser.doRegister)
  .get('/user/login', controllerUser.login)
  /**
   * {
   *  username:username,
   * paessword:password
   * }
   */
  .post('/user/do-login', controllerUser.doLogin)
  .get('user/loginout', controllerUser.loginout)
  .get('/user/getpic', controllerUser.getPic)

module.exports = userRouter

