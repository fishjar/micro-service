'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('address', model(app.Sequelize).address, { tableName: 'address' });
