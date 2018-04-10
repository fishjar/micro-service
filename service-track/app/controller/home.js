'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async promo() {
    const { ctx } = this;
    const data = await ctx.service.promos.getPromo(ctx.request.body);
    ctx.body = {
      errcode: 0,
      errmsg: 'get promocode success!',
      data,
    };
  }
}

module.exports = HomeController;
