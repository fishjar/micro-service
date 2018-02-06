'use strict';

module.exports = {
  foo(param) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
  },
  obj2arr(obj) {
    return Object.keys(obj).reduce((arr, key) => [...arr, key, obj[key]], []);
  },
  generateURL(url, params) {
    const myURL = new URL(url);
    if (params) {
      Object.keys(params).forEach(key => myURL.searchParams.append(key, params[key]))
    }
    return myURL;
  },
  generateHref(url, params) {
    return this.generateURL(url, params).href;
  },
};
