'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('waybill', model(app.Sequelize).waybill, { tableName: 'waybill' });
