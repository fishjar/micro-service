'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('product', model(app.Sequelize).product);
