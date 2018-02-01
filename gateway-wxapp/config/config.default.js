'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517215126304_8672';

  // add your config here
  // config.middleware = [];
  // config.middleware = ['errors'];
  config.middleware = ['auth', 'errors'];

  const ms_host = `localhost`
  config.ms_api = {
    user_api: `${ms_host}:9102`,
    wx_api: `${ms_host}:9103`,
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: null,
      db: 0,
    },
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => isInnerIp(ctx.ip),
      enable: false,
    },
  }

  // config.cors = {
  //   origin: '*',
  //   allowMethods: 'GET'
  // };

  return config;
};
