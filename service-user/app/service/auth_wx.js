'use strict';

const Service = require('egg').Service;

class AuthWx extends Service {

  async findByWxID(wxuser_id) {
    const { ctx } = this;
    return await ctx.model.AuthWx.findOne({ where: { wxuser_id } });
  }

  async create({ user_id, wxuser_id }) {
    const verify_time = Date.now();
    const expire_time = verify_time + 60*60*24*365; // 一年过期
    return this.ctx.model.AuthWx.create({
      user_id,
      wxuser_id,
      verify_time,
      expire_time,
    });
  }

}

module.exports = AuthWx;
