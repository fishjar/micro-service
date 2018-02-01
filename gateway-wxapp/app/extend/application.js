const { URL, URLSearchParams } = require('url');

const utils = {
  obj2arr: function (obj) {
    return Object.keys(obj).reduce((arr, key) => [...arr, key, obj[key]], [])
  }
}

module.exports = {
  async API(url, args) {
    const { ctx } = this;
    // 添加验证信息到headers，备用
    Object.assign(args.headers, {
      user_id: ctx.auth.user_id
    });
    const res = await ctx.curl(url, args);
    if (res.status > 300) {
      ctx.throw(res.status, `curl err : ${url} : ${res.data}`)
    }
    if (res.data.errcode !== 0) {
      ctx.throw(401, `curl err : ${url} : ${res.data.errmsg}`)
    }
    return res.data.data
  },
  generateURL(url, params) {
    const myURL = new URL(url)
    if (params) {
      const myParams = new URLSearchParams(params)
      myURL.searchParams = myParams
    }
    return myURL
  },
  generateHref(url, params) {
    return generateURL(url, params).href
  },
  utils,
};
