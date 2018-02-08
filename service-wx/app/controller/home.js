'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    this.ctx.body = 'hi, egg';
  }

  // 登录
  async login() {
    const { ctx } = this;
    const { appid, js_code } = ctx.request.body;
    if (!(appid && js_code)) {
      this.ctx.throw(501, 'missing params!');
    }
    const { secret } = await ctx.service.wxapp.findApp(appid);
    const { session_key, openid } = await ctx.service.wxapp.getSessionKey({ appid, secret, js_code });
    const wxuser = (await ctx.service.wxuser.findOrCreate({ appid, openid }))[0];
    // 更新 session_key 信息
    await ctx.service.wxuser.update(wxuser.id, {
      session_key,
    });
    delete wxuser.session_key; // 过滤 session_key 信息
    ctx.body = {
      data: wxuser,
      errcode: 0,
      errmsg: 'get user!',
    };
  }

  // 解密并更新用户资料
  async wxuser() {
    const { ctx } = this;
    const { wxuser_id, encryptedData, iv } = ctx.request.body;
    if (!(wxuser_id && encryptedData && iv)) {
      this.ctx.throw(501, 'missing params!');
    }
    const { appid, session_key } = await ctx.service.wxuser.find(wxuser_id);
    const {
      nickName,
      unionId,
      avatarUrl,
      gender,
      city,
      province,
      country,
    } = ctx.service.wxapp.encryData({
      appid,
      sessionKey: session_key,
      encryptedData,
      iv,
    });
    const wxuser = await ctx.service.wxuser.update(wxuser_id, {
      nickname: nickName,
      unionid: unionId,
      avatar: avatarUrl,
      gender,
      city,
      province,
      country,
    });
    ctx.body = {
      data: wxuser,
      errcode: 0,
      errmsg: 'update user info!',
    };
  }

}

module.exports = HomeController;
