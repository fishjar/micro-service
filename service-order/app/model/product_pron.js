'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('product_pron', model(app.Sequelize).product_pron);
