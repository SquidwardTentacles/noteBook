module.exports = (config) => {
  return async (ctx, next) => {
    // 先放行 
    try {
      await next()
    } catch (e) {
      // 根据自己的code状态码来进行相应的更改 
      // ctx.render('error', { code: 002, mag: 'err' })
      ctx.body = {
        code: 002, msg: e.message
      }
    }

  }
}