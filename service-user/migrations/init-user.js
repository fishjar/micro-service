'use strict';

const co = require('co');
const model = require('../app/utils/model');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('users', model(Sequelize).user);
    yield db.createTable('auth_wxes', model(Sequelize).auth_wx);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('users');
    yield db.dropTable('auth_wxes');
  }),
};
