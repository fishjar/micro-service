'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    // ctx.throw(400, 'name required', { code: 101, msg:'test' });
    await app.redis.set('foo', 'bar');
    ctx.body = await app.redis.get('foo');
    // const obj = { a: 1, b: 3 };
    // const v = app.utils.obj2arr(obj);
    // await app.redis.hmset('foo1', v);
    // await app.redis.expire('foo1', 3);
    // await app.redis.hmset('foo2', v);
    // ctx.body = {
    //   foo1: await app.redis.hgetall('foo1'),
    //   foo2: await app.redis.hgetall('foo2'),
    // }
  }

  async login() {
    const { ctx } = this;
    const { appid, code, encryptedData, iv } = ctx.request.body;
    const { user } = await ctx.service.home.getUserByLogin({ appid, js_code: code, encryptedData, iv });
    const { token, token_expire } = await ctx.service.home.flashToken({ user_id: user.id, auth_type: 4 });
    // 做hashids处理
    user.id = ctx.helper.hashids.encode(user.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'login success',
      data: {
        user,
        token,
        token_expire,
      },
    };
    ctx.status = 201;
  }
}

module.exports = HomeController;
