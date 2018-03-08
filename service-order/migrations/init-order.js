'use strict';

const co = require('co');
const model = require('../app/utils/model');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('order', model(Sequelize).order);
    yield db.createTable('oditem', model(Sequelize).oditem);
    yield db.createTable('address', model(Sequelize).address);
    yield db.createTable('waybill', model(Sequelize).waybill);
    yield db.createTable('express', model(Sequelize).express);
    yield db.createTable('pay', model(Sequelize).pay);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('order');
    yield db.dropTable('oditem');
    yield db.dropTable('address');
    yield db.dropTable('waybill');
    yield db.dropTable('express');
    yield db.dropTable('pay');
  }),
};
