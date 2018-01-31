'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async login() {
    const { ctx, app, config } = this;
    // await app.redis.set('foo', 'bar');
    // ctx.body = await app.redis.get('foo');
    const { authenticationtoken } = ctx.request.header;
    if (authenticationtoken) {
      ctx.body = await ctx.service.home.getUserByToken(authenticationtoken);
    } else {
      const { appid, code, encryptedData, iv } = ctx.params;
      ctx.body = await ctx.service.home.getUserByLogin({ appid, js_code: code, encryptedData, iv });
    }

  }
}

module.exports = HomeController;
