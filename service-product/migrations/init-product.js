'use strict';

const co = require('co');
const model = require('../app/utils/model');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    yield db.createTable('cats', model(Sequelize).cat);
    yield db.createTable('corporations', model(Sequelize).corporation);
    yield db.createTable('brands', model(Sequelize).brand);
    yield db.createTable('products', model(Sequelize).product);
    yield db.createTable('skus', model(Sequelize).sku);
    yield db.createTable('prons', model(Sequelize).pron);
    yield db.createTable('product_prons', model(Sequelize).product_pron);
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('cats');
    yield db.dropTable('corporations');
    yield db.dropTable('brands');
    yield db.dropTable('products');
    yield db.dropTable('skus');
    yield db.dropTable('prons');
    yield db.dropTable('product_prons');
  }),
};
