import model from '../uitls/model.js';

module.exports = app => app.model.define('wxuser', model(app.Sequelize).wxuser);