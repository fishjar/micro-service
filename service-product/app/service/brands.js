'use strict';

const Service = require('egg').Service;

class RESTService extends Service {

  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
    return this.ctx.model.Brand.findAndCountAll({
      offset,
      limit,
      order: [[ order_by, order.toUpperCase() ]],
    });
  }

  async find(id) {
    const res = await this.ctx.model.Brand.findById(id);
    if (!res) {
      this.ctx.throw(404, 'Brand not found');
    }
    return res;
  }

  async create(params) {
    return this.ctx.model.Brand.create(params);
  }

  async update(id, updates) {
    const res = await this.ctx.model.Brand.findById(id);
    if (!res) {
      this.ctx.throw(404, 'Brand not found');
    }
    return res.update(updates);
  }

  async del(id) {
    const res = await this.ctx.model.Brand.findById(id);
    if (!res) {
      this.ctx.throw(404, 'Brand not found');
    }
    return res.destroy();
  }

}

module.exports = RESTService;
