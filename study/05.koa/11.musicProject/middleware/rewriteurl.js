module.exports = (rules) => {
  return async (ctx, next) => {

    // 对于页面url的处理 app.js页面指定相关规则 在这里书写相关方法
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      // 判断是否需要使用正则
      if (rule.regex) {
        let result = rule.regex.exec(ctx.url)
        // console.log(result, ctx.url);

        // result不匹配null或者匹配 
        if (result) {
          // 判断直接赋值还是取分组内容 
          if (!rule.dist) {
            // 如果说找不到参数中dist的内容 就直接用exec结果的第二项 去掉public后的url地址
            ctx.url = result[1]
          } else {
            // 如果说dist 有值 就用dist的链接 修改默认的请求地址为dist地址
            ctx.url = rule.dist
          }
        }
      }
      // 字符串精确匹配的
      if (rule.src === ctx.url) {
        // 请求地址如果是 ‘/’ 则重写url到登陆页面 不使用重定向 是因为重定向会修改用户的请求地址 
        ctx.url = rule.dist;
      }
    }
    // 放行
    await next()
  }
}