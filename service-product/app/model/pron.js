'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('pron', model(app.Sequelize).pron);
