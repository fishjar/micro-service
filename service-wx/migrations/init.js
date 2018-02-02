'use strict';

const co = require('co');
const model = require('../app/utils/model');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('wxapps', model(Sequelize).wxapp);
    yield db.createTable('wxusers', model(Sequelize).wxuser);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('wxapps');
    yield db.dropTable('wxusers');
  }),
};
