const { URL, URLSearchParams } = require('url');

const utils = {
  obj2arr: function(obj){
    return Object.keys(obj).reduce((arr,key)=>[...arr,key,obj[key]],[])
  }
}

module.exports = {
  async API(...args) {
    const { ctx } = this;
    const res = await ctx.curl(...args);
    if (res.status > 300) {
      ctx.throw(res.status, `curl err : ${args[0]} : ${res.data}`)
    }
    if (res.data.errcode !== 0) {
      ctx.throw(401, `curl err : ${args[0]} : ${res.data.errmsg}`)
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
