'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async user() {
    const { ctx } = this;
    let { id } = ctx.params;
    id = ctx.helper.hashids.decode(id)[0];
    const { user_id } = ctx.auth;
    // 只有本人能查询个人资料
    if (id !== +user_id) {
      ctx.throw(501, 'auth err!');
    }
    const user = await ctx.service.user.find(id);
    // user.id 做hashids处理
    user.id = ctx.helper.hashids.encode(user.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get success',
      data: user,
    }
    ctx.status = 200
  }
}

module.exports = UserController;
