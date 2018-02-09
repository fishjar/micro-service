'use strict';

module.exports = options => {
  return async function errors(ctx, next) {
    try {
      await next();
      // ctx.logger.info('ok');
    } catch (err) {
      ctx.logger.error(ctx.auth);
      ctx.logger.error(err);
      ctx.status = 400;
      ctx.body = JSON.stringify({
        errcode: 100,
        errmsg: `${err.msg || err.message}`,
      });
    }
  };
};
