'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517215058546_3015';

  // add your config here
  config.middleware = [];

  config.jscode_host = 'https://api.weixin.qq.com/sns/jscode2session';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'mslab',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '456'
  };

  return config;
};
