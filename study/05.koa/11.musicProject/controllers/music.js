module.exports = {
  index: async (ctx, next) => ctx.render('index'),
  edit: async (ctx, next) => ctx.render('edit'),
  add: async (ctx, next) => ctx.render('add'),
}