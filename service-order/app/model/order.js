'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('order', model(app.Sequelize).order, { tableName: 'order' });
