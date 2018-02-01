'use strict';
const co = require('co');
import model from '../app/uitls/model.js';

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('wxapp', model(Sequelize).wxapp);
    yield db.createTable('wxuser', model(Sequelize).wxuser);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('wxapp');
    yield db.dropTable('wxuser');
  }),
};
