const Service = require('egg').Service;
const crypto = require('crypto');

class Home extends Service {
  async getUserByToken(token) {
    const { ctx, app, config } = this;
    const auth = await app.redis.get(`auth:${token}`);
    if (!auth.user_id) {
      this.ctx.throw(404, 'user not found');
    }
    const res_user = await ctx.curl(`${config.user_api}/user/${auth.user_id}`);
    this.flashToken()
    return res_user;
  }
  async getUserByLogin({ appid, js_code, encryptedData, iv }) {
    const { ctx, app, config } = this;
    const res_wxuser = await ctx.curl(`${config.wx_api}/wxlogin`, { appid, js_code, encryptedData, iv });
    const res_user = await ctx.curl(`${config.user_api}/login`, {
      auth_type: 4,
      wxuser_id: res_wxuser.data.id,
      user_info: res_wxuser.data,
    });
    return res_user;
  }
  async flashToken({ user_id, auth_type, expire_time, verify_time }) {
    const token_expire = Date.now() / 1000 + 60 * 60 * 24 * 3; // 3天过期
    Object.assign(auth, { token_expire });
    const token = await this.generateToken({ user_id, token_expire });
    await app.redis.set(`auth:${token}`, {
      user_id,
      auth_type,
      expire_time,
      verify_time,
      token_expire,
    });
    return { token, token_expire };
  }
  async generateToken({ user_id, token_expire }) {
    const secret = 'wxapp';
    const hash = crypto.createHmac('sha256', secret)
      .update(user_id)
      .update(token_expire)
      .digest('hex');
    return hash;
  }
}  