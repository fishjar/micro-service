const Service = require('egg').Service;

class User extends Service {
  async find(id) {
    const { ctx, config } = this;
    return await ctx.API(`${config.msapi.user}/users/${id}`, { dataType: 'json', });
  }
}

module.exports = User;