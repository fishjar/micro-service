'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async wxlogin() {
    const { ctx } = this;
    const { appid, js_code, encryptedData, iv } = ctx.request.body;
    const { secret } = await ctx.service.wxapp.findApp(appid);
    const { session_key, openid, unionid } = await ctx.service.wxapp.getSessionKey({ appid, secret, js_code });
    const wxuser = await ctx.service.wxuser.findByAppid(appid, { openid, unionid });
    // 如果存在，这里简单处理，直接返回!!!!正常需要更新信息才返回!!!!
    ctx.body = {
      data: wxuser,
      errcode: 0,
      errmsg: 'get user!',
    };
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
      } = ctx.service.wxapp.encryData(appid, session_key, encryptedData, iv);
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
      ctx.body = {
        data: newUser,
        errcode: 0,
        errmsg: 'create user!',
      };
    }
  }
}

module.exports = HomeController;
