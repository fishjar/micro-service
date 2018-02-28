'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class Home extends Service {

  async getAuth(token) {
    const { app } = this;
    return await app.redis.hgetall(`auth:${token}`);
  }

  async login({ appid, js_code }) {
    const { ctx, config } = this;
    const wxuser = await ctx.API(`${config.msapi.wx}/login`, {
      method: 'POST',
      data: {
        appid,
        js_code,
      },
    });
    const { user, auth } = await ctx.API(`${config.msapi.user}/login`, {
      method: 'POST',
      data: {
        auth_type: 4,
        wxuser,
      },
    });
    return { wxuser, user, auth };
  }

  async wxuser({ aid, encryptedData, iv }) {
    const { ctx, config } = this;
    const { wxuser_id, user_id } = await ctx.API(`${config.msapi.user}/auth_wx/${aid}`);
    const wxuser = await ctx.API(`${config.msapi.wx}/wxuser`, {
      method: 'POST',
      data: {
        wxuser_id,
        encryptedData,
        iv,
      },
    });
    const user = await ctx.API(`${config.msapi.user}/users/${user_id}`, {
      method: 'PUT',
      data: wxuser,
    });
    return { wxuser, user };
  }

  async flashToken({ aid, uid, atype = 4 }) {
    const { ctx, app, config } = this;
    const now = ~~(Date.now() / 1000);
    const expire = now + config.expire_offset;
    const token = this.generateToken({ aid, uid, atype, expire });
    const key = `auth:${token}`;
    const obj = {
      aid,
      uid,
      atype,
      expire,
    };
    await app.redis.hmset(key, ctx.helper.obj2arr(obj));
    await app.redis.expire(key, config.expire_offset);
    console.log('----------auth------------');
    console.log({ key });
    console.log(await app.redis.hgetall(key));
    ctx.auth = obj; // 更新全局变量
    return { token, expire };
  }

  async flushToken(token) {
    const { app } = this;
    return app.redis.del(`auth:${token}`);
  }

  async deferToken(token) {
    const { app, config } = this;
    const key = `auth:${token}`;
    return app.redis.expire(key, config.expire_offset);
  }

  generateToken({ aid, uid, atype, expire }) {
    const secret = 'wxapp';
    const hash = crypto.createHmac('sha256', secret)
      .update(`${aid}`)
      .update(`${uid}`)
      .update(`${atype}`)
      .update(`${expire}`)
      .digest('hex');
    return hash;
  }

  async wxpay() {
    const { ctx, config } = this;
    const wxpay = await ctx.API(`${config.msapi.wx}/unifiedorder`, {
      method: 'POST',
      data: {
        body: 'test',
        out_trade_no: Date.now(),
        total_fee: 2,
        spbill_create_ip: ctx.ip,
        trade_type: 'JSAPI',
        appid: 'wx7aacccc73ccea206',
        openid: 'o4pXt0ILIpIVIObuYG_JvunqP8JE'
      },
    });
    return wxpay;
  }

}

module.exports = Home;
