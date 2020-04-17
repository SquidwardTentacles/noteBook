const musicModel = require('../models/music')
module.exports = {
  index: async (ctx, next) => ctx.render('index'),
  edit: async (ctx, next) => ctx.render('edit'),
  add: async (ctx, next) => ctx.render('add'),
  addMusic: async (ctx, next) => {
    console.log(ctx.request.files);

    // let backSql = await musicModel.addMusic()
  }
}