'use strict';

const Controller = require('egg').Controller;

class AuthWxController extends Controller {
  async auth_wx() {
    const { ctx } = this;
    const auth = await ctx.service.authWx.find(ctx.params.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get auth_wx success!',
      data: auth,
    };
    ctx.status = 200;
  }
}

module.exports = AuthWxController;
