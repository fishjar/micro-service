'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('pay', model(app.Sequelize).pay, { tableName: 'pay' });
