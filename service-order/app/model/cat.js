'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('cat', model(app.Sequelize).cat);
