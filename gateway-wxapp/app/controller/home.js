'use strict';

const Controller = require('egg').Controller;
const FromStream = require('formstream');

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

  async test() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.wxpay();
  }

  // 登录
  async login() {
    const { ctx } = this;
    const { appid, code } = ctx.request.body;
    const { authentication } = ctx.request.header;
    if (!(appid && code)) {
      ctx.throw(501, 'missing params!');
    }
    const { auth, user, isnew } = await ctx.service.home.login({ appid, js_code: code });
    const { token, expire } = await ctx.service.home.flashToken({ aid: auth.id, uid: auth.user_id });
    await ctx.service.home.flushToken(authentication);
    user.id = ctx.helper.hashids.encode(user.id); // hashids处理
    ctx.body = {
      errcode: 0,
      errmsg: 'login success',
      data: {
        user,
        isnew,
        token,
        expire,
      },
    };
  }

  // 解密并更新用户资料
  async wxuser() {
    const { ctx } = this;
    const { encryptedData, iv } = ctx.request.body;
    if (!(encryptedData && iv)) {
      ctx.throw(501, 'missing params!');
    }
    const { aid } = ctx.auth;
    const { user } = await ctx.service.home.wxuser({ aid, encryptedData, iv });
    user.id = ctx.helper.hashids.encode(user.id);
    ctx.body = {
      errcode: 0,
      errmsg: 'get and update success',
      data: user,
    };
  }

  // 上传文件
  async upload() {
    const { ctx, config } = this;
    const stream = await ctx.getFileStream();
    const form = new FromStream();
    Object.keys(stream.fields).forEach(key => form.field(key, stream.fields[key]));
    form.stream(stream.fieldname, stream, stream.filename);

    const res = await ctx.API(`${config.msapi.media}/upload/ajax`, {
      method: 'POST',
      dataType: 'json',
      stream: form,
      headers: form.headers(),
    });

    ctx.body = {
      errcode: 0,
      errmsg: 'upload success',
      data: res,
    };
  }

  // 微信支付测试
  async wxpay() {
    const { ctx, config } = this;
    const { body, total_fee } = ctx.request.body;
    const { appid, openid } = await ctx.service.home.getOpenid();
    const res = await ctx.API(`${config.msapi.wx}/unifiedorder`, {
      method: 'POST',
      data: {
        body,
        out_trade_no: Date.now(),
        total_fee,
        spbill_create_ip: ctx.ip,
        trade_type: 'JSAPI',
        appid,
        openid,
      },
    });

    ctx.body = {
      errcode: 0,
      errmsg: 'unifiedorder success',
      data: res,
    };

  }

  // 获取推广码
  async promo() {
    const { ctx, config } = this;
    const body = ctx.request.body;
    body.user_id = ctx.helper.hashids.decode(body.user_id)[0];
    const res = await ctx.API(`${config.msapi.track}/promo`, {
      method: 'POST',
      data: body,
    });

    ctx.body = {
      errcode: 0,
      errmsg: 'get promo success',
      data: res,
    };
  }

  // 上报推广码使用
  async tracks() {
    const { ctx, config } = this;
    const body = ctx.request.body;
    body.user_id = ctx.helper.hashids.decode(body.user_id)[0];
    const res = await ctx.API(`${config.msapi.track}/tracks`, {
      method: 'POST',
      data: body,
    });

    ctx.body = {
      errcode: 0,
      errmsg: 'create tracks success',
      data: res,
    };
  }

  // 上报转发
  async shares() {
    const { ctx, config } = this;
    const body = ctx.request.body;
    body.user_id = ctx.helper.hashids.decode(body.user_id)[0];
    const res = await ctx.API(`${config.msapi.track}/shares`, {
      method: 'POST',
      data: body,
    });

    ctx.body = {
      errcode: 0,
      errmsg: 'create shares success',
      data: res,
    };
  }

}

module.exports = HomeController;
