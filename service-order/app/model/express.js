'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('express', model(app.Sequelize).express, { tableName: 'express' });
