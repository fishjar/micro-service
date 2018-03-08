'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/test', controller.home.test);
  router.post('/login', controller.home.login);
  router.post('/wxuser', controller.home.wxuser);
  router.get('/users/:id', controller.user.user);
  router.post('/upload', controller.home.upload);
  router.post('/wxpay', controller.home.wxpay);
};
