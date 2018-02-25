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
    const { wxmch_id } = await ctx.service.wxapp.findApp(appid);
    const { mchid, secret } = await ctx.service.wxmch.find(wxmch_id);
    const { unifiedorder_host } = config;
    const nonce_str = Math.random().toString(36).substr(2, 16);
    const signObj = Object.assign({
      mch_id: mchid,
      nonce_str,
    }, args);
    const sign = ctx.helper.wxSign(signObj, secret);
    const xml = ctx.helper.json2xml(Object.assign({ sign }, signObj));
    const r = await ctx.curl(unifiedorder_host, {
      method: 'POST',
      content: xml,
      headers: {
        'content-type': 'text/html',
      },
    });
    const res = ctx.helper.xml2json(r.data);
    if (res.return_code !== 'SUCCESS' || res.result_code !== 'SUCCESS') {
      this.ctx.throw(500, `wxpay err! [${res.err_code}]: ${res.err_code_des}`);
    }
    const wxpay = await ctx.service.wxpay.create(Object.assign({ sign }, signObj, res));
    return wxpay
  }

}

module.exports = Wxpay;
