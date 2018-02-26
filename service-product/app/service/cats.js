'use strict';

const Service = require('egg').Service;

class CatService extends Service {

  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
    return this.ctx.model.Cat.findAndCountAll({
      offset,
      limit,
      order: [[ order_by, order.toUpperCase() ]],
    });
  }

  async find(id) {
    const cat = await this.ctx.model.Cat.findById(id);
    if (!cat) {
      this.ctx.throw(404, 'cat not found');
    }
    return cat;
  }

  async create(params) {
    return this.ctx.model.Cat.create(params);
  }

  async update(id, updates) {
    const cat = await this.ctx.model.Cat.findById(id);
    if (!cat) {
      this.ctx.throw(404, 'cat not found');
    }
    return cat.update(updates);
  }

  async del(id) {
    const cat = await this.ctx.model.Cat.findById(id);
    if (!cat) {
      this.ctx.throw(404, 'cat not found');
    }
    return cat.destroy();
  }

}

module.exports = CatService;
