'use strict';

const co = require('co');
const model = require('../uitls/model.js');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('user', model(Sequelize).user);
    yield db.createTable('auth_wx', model(Sequelize).auth_wx);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('user');
    yield db.dropTable('auth_wx');
  }),
};
