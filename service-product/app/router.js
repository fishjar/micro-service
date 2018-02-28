'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('cats', '/cats', controller.cats);
  router.resources('corporations', '/corporations', controller.corporations);
  router.resources('brands', '/brands', controller.brands);
  router.resources('products', '/products', controller.products);
  router.resources('skus', '/skus', controller.skus);
  router.resources('prons', '/prons', controller.prons);
  router.resources('pps', '/pps', controller.pps);
  // router.resources('pps', '/prons/:id/products/:id', controller.pps);
  // router.resources('pss', '/prons/:id/skus:/id', controller.pss);
};
