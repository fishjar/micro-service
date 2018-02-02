'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/wxlogin', controller.home.wxlogin);
  router.get('/wxusers/:id', controller.wxuser.wxuser);
  router.get('/wxapps/:id', controller.wxapp.wxapp);
  router.get('/wxapps', controller.wxapp.wxapps);
  router.post('/wxapps', controller.wxapp.create);
};
