import model from '../uitls/model.js';

module.exports = app => app.model.define('user', model(app.Sequelize).user);