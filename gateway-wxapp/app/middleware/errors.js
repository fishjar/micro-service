module.exports = options => {
  return async function errors(ctx, next) {
    try {
      await next();
      // ctx.logger.info('ok');
    } catch (err) {
      ctx.logger.error(`auth: ${JSON.stringify(ctx.auth)}`);
      ctx.logger.error(err);
      ctx.status = err.status || 400;
      ctx.body = JSON.stringify({
        errcode: `${err.code||100}`,
        errmsg: `${err.msg||err.message}`,
      });
    }
  }
};