'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517215096827_418';

  // add your config here
  // config.middleware = [];
  config.middleware = [ 'auth', 'errors' ];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'mslab',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => isInnerIp(ctx.ip),
      ignore: ctx => ctx.ip === '127.0.0.1',
      enable: false,
    },
  };

  // config.security = {
  //   domainWhiteList: ['http://localhost:4200']
  // };

  // config.cors = {
  //   origin: '127.0.0.1',
  //   // allowMethods: 'GET'
  // };

  return config;
};
