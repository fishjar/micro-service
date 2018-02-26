'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  pid: 'int',
  is_parent: { type: 'enum', values: ['N', 'Y'], required: false },
  sort: 'int',
  description: 'string',
};

class CatController extends Controller {

  async index() {
    const { ctx } = this;
    const cats = await ctx.service.cats.list(ctx.query);
    ctx.body = {
      errcode: 0,
      errmsg: 'get cats success!',
      data: cats,
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule);
    const cat = await ctx.service.cats.create(ctx.request.body);
    ctx.body = {
      errcode: 0,
      errmsg: 'create cat success!',
      data: cat,
    };
  }

  async show() {
    const { ctx } = this;
    const cat = await ctx.service.cats.find(ctx.params.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get cat success!',
      data: cat,
    };
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    const cat = await ctx.service.cats.update(ctx.params.id, body);
    ctx.body = {
      errcode: 0,
      errmsg: 'update cat success!',
      data: cat,
    };
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.cats.del(id);
    ctx.body = {
      errcode: 0,
      errmsg: 'delete cat success!',
      data: { id },
    };
  }

}

module.exports = CatController;
