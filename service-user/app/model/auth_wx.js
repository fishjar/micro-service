import model from '../uitls/model.js';

module.exports = app => app.model.define('auth_wx', model(app.Sequelize).auth_wx);