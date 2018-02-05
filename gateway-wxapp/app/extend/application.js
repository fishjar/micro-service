'use strict';

const { URL, URLSearchParams } = require('url');

const utils = {
  obj2arr: obj => {
    return Object.keys(obj).reduce((arr, key) => [ ...arr, key, obj[key] ], []);
  },
};

const API = async (...args) => {
  const { ctx } = this;
  const res = await ctx.curl(...args);
  if (res.status > 300) {
    ctx.throw(res.status, `curl err : ${args[0]} : ${res.data}`);
  }
  if (res.data.errcode !== 0) {
    ctx.throw(401, `curl err : ${args[0]} : ${res.data.errmsg}`);
  }
  return res.data;
};

const generateURL = (url, params) => {
  const myURL = new URL(url);
  if (params) {
    Object.keys(params).forEach(key => myURL.searchParams.append(key, params[key]))
  }
  return myURL;
};

const generateHref = (url, params) => {
  return generateURL(url, params).href;
};

module.exports = {
  API,
  generateURL,
  generateHref,
  utils,
};
