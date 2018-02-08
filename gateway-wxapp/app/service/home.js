'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class Home extends Service {
  async getAuth(token) {
    const { app } = this;
    return await app.redis.hgetall(`auth:${token}`);
  }
  async getUserByLogin({ appid, js_code, encryptedData, iv }) {
    const { ctx, config } = this;
    const wxuser = await ctx.API(`${config.msapi.wx}/wxlogin`, {
      method: 'POST',
      dataType: 'json',
      data: {
        appid,
        js_code,
        encryptedData,
        iv,
      },
    });
    const { user, auth } = await ctx.API(`${config.msapi.user}/login`, {
      method: 'POST',
      dataType: 'json',
      data: Object.assign({ auth_type: 4 }, wxuser, { obj: { a: 1 } }),
      // data: {
      //   auth_type: 4,
      //   wxuser_id: wxuser.id,
      //   user_info: wxuser,
      // }
    });
    return { user, auth };
  }
  async login({ appid, js_code }) {
    const { ctx, config } = this;
    const wxuser = await ctx.API(`${config.msapi.wx}/login`, {
      method: 'POST',
      dataType: 'json',
      data: {
        appid,
        js_code,
      },
    });
    const { user, auth } = await ctx.API(`${config.msapi.user}/login`, {
      method: 'POST',
      dataType: 'json',
      data: {
        auth_type: 4,
        wxuser, // 这里不能是对象
      },
    });
    return { wxuser, user, auth };
  }
  async wxuser({ aid, encryptedData, iv }) {
    const { ctx, config } = this;
    const { wxuser_id, user_id } = await ctx.API(`${config.msapi.user}/auth_wx/${aid}`);
    const wxuser = await ctx.API(`${config.msapi.wx}/wxuser`, {
      method: 'POST',
      dataType: 'json',
      data: {
        wxuser_id,
        encryptedData,
        iv,
      },
    });
    const user = await ctx.API(`${config.msapi.user}/users/${user_id}`, {
      method: 'PUT',
      dataType: 'json',
      data: wxuser,
    });
    return { wxuser, user };
  }
  async flashToken({ aid, uid, atype = 4 }) {
    const { ctx, app } = this;
    const now = ~~(Date.now() / 1000);
    const expire_offset = 60 * 60 * 24 * 3; // 3天过期
    const expire = now + expire_offset;
    const token = this.generateToken({ aid, uid, atype, expire });
    const key = `auth:${token}`;
    const obj = {
      aid,
      uid,
      atype,
      expire,
    };
    await app.redis.hmset(key, ctx.helper.obj2arr(obj));
    await app.redis.expire(key, expire);
    console.log('----------auth------------');
    console.log({ key });
    console.log(await app.redis.hgetall(key));
    ctx.auth = obj; // 更新全局变量
    return { token, expire };
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
}

module.exports = Home;
