'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('order', '/orders', controller.order);
  router.resources('oditem', '/oditems', controller.oditem);
  router.resources('address', '/address', controller.address);
  router.resources('waybill', '/waybills', controller.waybill);
  router.resources('express', '/express', controller.express);
  router.resources('pay', '/pays', controller.pay);
};
