'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520046757055_2845';

  // add your config here
  // config.middleware = [];
  config.middleware = ['auth', 'errors'];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'mslab',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '456',
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => isInnerIp(ctx.ip),
      ignore: ctx => ctx.ip === '127.0.0.1',
      enable: false,
    },
  };

  config.fileTypes = [
    [
      // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
    ],
    [
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.xml',
    ],
    [
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
    ],
    [
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ]
  ];
  config.baseDir = '/home/gabe/tmp/egg';
  config.baseUrl = 'http://media.fishjar.com/';
  config.multipart = {
    fileSize: '10mb',
    // whitelist: [
    //   '.png',
    //   '.jpg',
    // ],
  };


  return config;
};
