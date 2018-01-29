'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async wxlogin() {
    const ctx = this.ctx;
    const { appid, js_code, encryptedData, iv } = ctx.params;
    const wxapp = await ctx.service.wxapp.findByAppid(appid);
    const { secret } = wxapp;
    const { session_key, openid, unionid } = await ctx.service.wxapp.getSessionKey({ appid, secret, js_code });
    const wxuser = await ctx.service.wxuser.findByAppid(appid, { openid, unionid });
    // 如果用户不存在则创建后返回
    if (!wxuser) {
      // 解密数据
      const {
        name,
        avatar,
        gender,
        nickname,
        city,
        province,
        country,
      } = await ctx.service.wxapp.encryData(appid, session_key, encryptedData, iv);
      // 创建用户
      const newUser = await ctx.service.wxuser.create({
        appid,
        unionid,
        openid,
        session_key,
        name,
        avatar,
        gender,
        nickname,
        city,
        province,
        country,
      });
      return newUser;
    }
    return wxuser;
  }
}

module.exports = HomeController;
