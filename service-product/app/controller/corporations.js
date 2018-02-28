'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  corp_code: 'string',
};

const testData = {
  "name": "苹果公司",
  "corp_code": "A001",
};

class RESTController extends Controller {

  async index() {
    const { ctx } = this;
    const data = await ctx.service.corporations.list(ctx.query);
    ctx.body = {
      errcode: 0,
      errmsg: 'get list success!',
      data,
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);
    const data = await ctx.service.corporations.create(ctx.request.body);
    ctx.body = {
      errcode: 0,
      errmsg: 'create success!',
      data,
    };
  }

  async show() {
    const { ctx } = this;
    const data = await ctx.service.corporations.find(ctx.params.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get success!',
      data,
    };
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    const data = await ctx.service.corporations.update(ctx.params.id, body);
    ctx.body = {
      errcode: 0,
      errmsg: 'update success!',
      data,
    };
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.corporations.del(id);
    ctx.body = {
      errcode: 0,
      errmsg: 'delete success!',
      data: { id },
    };
  }

}

module.exports = RESTController;
