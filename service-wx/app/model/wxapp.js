import model from '../uitls/model.js';

module.exports = app => app.model.define('wxapp', model(app.Sequelize).wxapp);
