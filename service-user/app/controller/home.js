'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async login() {
    const { ctx } = this;
    const { auth_type, id: wxuser_id } = ctx.request.body;
    if (!(auth_type && wxuser_id)) {
      ctx.throw(501, 'missing params!');
    }
    if (+auth_type === 4) {
      const auth = await ctx.service.authWx.findByWxID(wxuser_id);
      if (auth) {
        const { user_id } = auth;
        const user = await ctx.service.user.find(user_id);
        ctx.body = {
          errcode: 0,
          errmsg: 'login && get user success!',
          data: {
            user,
            auth,
          },
        };
        ctx.status = 201;
      } else {
        // if (!user_info) {
        //   ctx.throw(501, 'missing user_info params!');
        // }
        const { nickname,avatar,gender,city,province,country } = ctx.request.body;
        const newUser = await ctx.service.user.create({
          nickname,avatar,gender,city,province,country
        });
        const newAuth = await ctx.service.authWx.create({ user_id: newUser.id, wxuser_id });
        ctx.body = {
          errcode: 0,
          errmsg: 'login && create user success!',
          data: {
            user: newUser,
            auth: newAuth,
          },
        };
        ctx.status = 201;
      }
    } else {
      ctx.throw(501, 'auth_type err!');
    }
  }
}

module.exports = HomeController;
