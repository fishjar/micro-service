'use strict';

const Service = require('egg').Service;

class RESTService extends Service {

  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC', filter }) {
    const options = {
      offset: +offset,
      limit: +limit,
      order: [[ order_by, order.toUpperCase() ]],
      where: {},
    };
    if (filter) {
      Object.assign(options.where, JSON.parse(decodeURIComponent(filter)));
    }
    return this.ctx.model.ProductPron.findAndCountAll(options);
  }

  async find(id) {
    const res = await this.ctx.model.ProductPron.findById(id);
    if (!res) {
      this.ctx.throw(404, 'ProductPron not found');
    }
    return res;
  }

  async create(params) {
    return this.ctx.model.ProductPron.create(params);
  }

  async update(id, updates) {
    const res = await this.ctx.model.ProductPron.findById(id);
    if (!res) {
      this.ctx.throw(404, 'ProductPron not found');
    }
    return res.update(updates);
  }

  async del(id) {
    const res = await this.ctx.model.ProductPron.findById(id);
    if (!res) {
      this.ctx.throw(404, 'ProductPron not found');
    }
    return res.destroy();
  }

}

module.exports = RESTService;
