module.exports = options => {
  return async function auth(ctx, next) {
    const { authentication } = ctx.request.header;
    const { appid, code, encryptedData, iv } = ctx.request.body;
    if (appid && code && encryptedData && iv && ctx.request.path === '/login') {
      await next();
    } else {
      if (authentication) {
        const auth = await ctx.service.home.getAuth(authentication);
        if (auth.user_id) {
          // 挂载用户鉴权信息
          // 如果用户资料保存在redis，也可考虑挂载用户资料
          ctx.auth = auth;
          await next();
        } else {
          ctx.body = {
            errcode: 101,
            errmsg: 'auth exprie!'
          }
          ctx.status = 201
        }
      } else {
        ctx.throw(401, `need auth info!`);
      }
    }
  }
};