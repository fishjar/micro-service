'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('media', model(app.Sequelize).media, { tableName: 'media' });
