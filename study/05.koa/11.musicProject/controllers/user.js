// controllers (c分发)
const modelUser = require('../models/user')
module.exports = {
  register: async (ctx, next) => {
    let user = await modelUser.showUser()
    console.log(user);
    ctx.render('register')
  },
  login: (ctx, next) => ctx.render('login'),
} 