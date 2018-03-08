'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload/ajax', controller.upload.ajax);
  router.resources('media', '/medias', controller.media);
};
