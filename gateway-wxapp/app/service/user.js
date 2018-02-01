const Service = require('egg').Service;

class User extends Service {
  async find(id) {
    const { app, config } = this;
    return await app.API(`${config.user_api}/user/${id}`);
  }
}

module.exports = User;