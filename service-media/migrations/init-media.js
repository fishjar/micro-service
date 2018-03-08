'use strict';

const co = require('co');
const model = require('../app/utils/model');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('media', model(Sequelize).media);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('media');
  }),
};
