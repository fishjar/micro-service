'use strict';

const model = require('../utils/model');

module.exports = app => app.model.define('oditem', model(app.Sequelize).oditem, { tableName: 'oditem' });
