'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async wxlogin() {
    const { ctx } = this;
    const { appid, js_code, encryptedData, iv } = ctx.request.body;
    if (!(appid && js_code)) {
      this.ctx.throw(501, 'missing params!');
    }
    const { secret } = await ctx.service.wxapp.findApp(appid);
    const { session_key, openid } = await ctx.service.wxapp.getSessionKey({ appid, secret, js_code });
    const wxuser = await ctx.service.wxuser.findByAppid(appid, { openid });
    // 如果存在，这里简单处理，直接返回!!!!正常应更新信息才返回!!!!
    ctx.body = {
      data: wxuser,
      errcode: 0,
      errmsg: 'get user!',
    };
    // 如果用户不存在则创建后返回
    if (!wxuser) {
      if (!(encryptedData && iv)) {
        this.ctx.throw(501, 'missing params!');
      }
      // 解密数据
      const userInfo = ctx.service.wxapp.encryData({
        appid,
        sessionKey: session_key,
        encryptedData,
        iv,
      });
      // 创建用户
      const newUser = await ctx.service.wxuser.create(Object.assign(userInfo, {
        appid,
        unionid: userInfo.unionId,
        openid: userInfo.openId,
        session_key,
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
      }));
      ctx.body = {
        data: newUser,
        errcode: 0,
        errmsg: 'create user!',
      };
    }
  }
}

module.exports = HomeController;
