'use strict';

const Service = require('egg').Service;

class Wxpay extends Service {
  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
    return this.ctx.model.Wxpay.findAndCountAll({
      offset,
      limit,
      order: [[order_by, order.toUpperCase()]],
    });
  }

  async find(id) {
    const wxpay = await this.ctx.model.Wxpay.findById(id);
    if (!wxpay) {
      this.ctx.throw(404, 'wxpay not found');
    }
    return wxpay;
  }

  async create(wxapp) {
    return this.ctx.model.Wxpay.create(wxapp);
  }

  async update(id, updates) {
    const wxpay = await this.ctx.model.Wxpay.findById(id);
    if (!wxpay) {
      this.ctx.throw(404, 'wxpay not found');
    }
    return wxpay.update(updates);
  }

  async unifiedorder(args) {
    const { ctx, config } = this;
    const { appid } = args;
    const { mchid, secret } = await ctx.service.wxapp.findApp(appid);
    const { unifiedorder_host } = config;

  }

}

module.exports = Wxpay;
