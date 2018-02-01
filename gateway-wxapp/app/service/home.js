const Service = require('egg').Service;
const crypto = require('crypto');

class Home extends Service {
  async getAuth(token) {
    const { app } = this;
    return await app.redis.hgetall(`auth:${token}`);
  }
  async getUserByLogin({ appid, js_code, encryptedData, iv }) {
    const { ctx, app, config } = this;
    const wxuser = await app.API(`${config.wx_api}/wxlogin`, {
      method: 'POST',
      data: {
        appid,
        js_code,
        encryptedData,
        iv,
      }
    });
    const user = await app.API(`${config.user_api}/login`, {
      method: 'POST',
      data: {
        auth_type: 4,
        wxuser_id: wxuser.id,
        user_info: wxuser,
      }
    });
    return user;
  }
  async flashToken({ user_id, auth_type }) {
    const { ctx, app } = this;
    const now = Date.now() / 1000;
    const expire = 60 * 60 * 24 * 3; // 3天过期
    const token_expire = now + expire;
    const token = this.generateToken({ user_id, token_expire });
    const key = `auth:${token}`;
    const obj = {
      user_id,
      auth_type,
      token_expire,
    }
    await app.redis.hmset(key, app.utils.obj2arr(obj));
    await app.redis.expire(key, expire);
    ctx.auth = obj; // 更新全局变量
    return { token, token_expire };
  }
  generateToken({ user_id, token_expire }) {
    const secret = 'wxapp';
    const hash = crypto.createHmac('sha256', secret)
      .update(user_id)
      .update(token_expire)
      .digest('hex');
    return hash;
  }
}

module.exports = Home;