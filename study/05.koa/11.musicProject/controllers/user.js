// controllers (c分发)
const modelUser = require('../models/user')
const captchapng = require('captchapng2');
module.exports = {
  // 响应注册页面
  register: async (ctx, next) => {
    ctx.render('register')
  },
  // 用户的注册验证
  doRegister: async (ctx, next) => {
    try {
      let username = ctx.request.body.username
      let userRegister = await modelUser.userRegister(username)
      if (userRegister.length > 0) {
        // 注册过
        ctx.body = { code: 002, msg: '此用户已经注册过' }
        return
      }
      ctx.body = { code: 001, msg: '可以注册' }
      if (!ctx.request.body.password) return
      let { password, email } = ctx.request.body
      // 如果可以注册 就调用相关方法进行注册
      let ifRegister = await modelUser.doRegister(username, password, email)
      if (ifRegister !== 1) {
        ctx.body = { code: 002, msg: '服务器异常！请稍后重试！' }
        return
      }
      ctx.body = { code: 001, msg: '注册成功' }
    } catch (e) {
      console.log('doRegister', e);
      ctx.throw({ code: 002, msg: e })
    }
  },
  // 响应登录页面
  login: (ctx, next) => ctx.render('login'),
  // 进行登录操作
  doLogin: async (ctx, next) => {
    let { username, password } = ctx.request.body
    try {
      let loginBack = await modelUser.doLogin(username, password)
      console.log(loginBack);
      if (loginBack.length === 0) {
        ctx.body = { code: 002, msg: '用户名或密码错误' }
        return
      }
      ctx.body = { code: 001, msg: '登录成功', uid: loginBack[0].id }
      // 保存session 如果用户名 密码正确则返回用户信息
      ctx.session.user = loginBack[0]
    } catch (e) {
      console.log('doLogin', e);
      ctx.throw({ code: 002, msg: e })
    }
  },
  // 退出登录
  loginout: async (ctx, next) => {

  },
  getPic: async (ctx, next) => {
    let rand = parseInt(Math.random() * 9000 + 1000);
    let png = new captchapng(80, 30, rand); // width,height, numeric captcha
    // res.writeHead(200, { 'Content-Type': 'image/png'});
    ctx.body = png.getBuffer()
  }
} 