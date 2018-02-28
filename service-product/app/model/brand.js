'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('brand', model(app.Sequelize).brand);
