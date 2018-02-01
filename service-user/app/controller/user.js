'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async user() {
    const { ctx } = this;
    const user = await ctx.service.user.find(ctx.params.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get user success!',
      data: user,
    }
    ctx.status = 200;
  }
}

module.exports = UserController;