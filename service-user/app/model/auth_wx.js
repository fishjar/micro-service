'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('auth_wx', model(app.Sequelize).auth_wx);
