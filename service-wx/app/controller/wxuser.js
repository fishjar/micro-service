'use strict';

const Controller = require('egg').Controller;

class WxuserController extends Controller {
  async wxuser() {
    const { ctx } = this;
    const wxuser = await ctx.service.wxuser.find(ctx.params.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get wxuser success!',
      data: wxuser,
    };
    ctx.status = 200;
  }
  async create() {
    const { ctx } = this;
    const created = await ctx.service.wxuser.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;
  }
}

module.exports = WxuserController;
