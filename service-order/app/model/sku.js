'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('sku', model(app.Sequelize).sku);
