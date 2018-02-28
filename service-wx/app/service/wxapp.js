'use strict';

const Service = require('egg').Service;
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');

class Wxapp extends Service {
  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
    return this.ctx.model.Wxapp.findAndCountAll({
      offset,
      limit,
      order: [[order_by, order.toUpperCase()]],
    });
  }

  async find(id) {
    const wxapp = await this.ctx.model.Wxapp.findById(id);
    console.log({ wxapp })
    if (!wxapp) {
      this.ctx.throw(404, 'wxapp not found');
    }
    return wxapp;
  }

  async create(wxapp) {
    return this.ctx.model.Wxapp.create(wxapp);
  }

  async update(id, updates) {
    const wxapp = await this.ctx.model.Wxapp.findById(id);
    if (!wxapp) {
      this.ctx.throw(404, 'wxapp not found');
    }
    return wxapp.update(updates);
  }

  async findApp(appid) {
    const wxapp = await this.ctx.model.Wxapp.findOne({ where: { appid } });
    if (!wxapp) {
      this.ctx.throw(404, 'wxapp not found');
    }
    return wxapp;
  }

  async getSessionKey({ appid, secret, js_code, grant_type = 'authorization_code' }) {
    const { ctx } = this;
    const jscode_host = this.config.jscode_host;
    const res = await ctx.curl(ctx.helper.generateHref(jscode_host, {
      appid,
      secret,
      js_code,
      grant_type,
    }), {
        dataType: 'json',
      });
    if (res.data.errmsg) {
      ctx.throw(404, res.data.errmsg);
    }
    return res.data;
  }

  encryData({ appid, sessionKey, encryptedData, iv }) {
    console.log({ appid, sessionKey, encryptedData, iv })
    const pc = new WXBizDataCrypt(appid, sessionKey);
    const data = pc.decryptData(encryptedData, iv);
    return data;
  }
}

module.exports = Wxapp;
