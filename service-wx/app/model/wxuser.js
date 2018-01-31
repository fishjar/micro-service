'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Wxuser = app.model.define('wxuser', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appid: STRING(32),
    unionid: STRING(32),
    openid: STRING(32),
    session_key: STRING(64),
    name: STRING(64),
    avatar: STRING(128),
    gender: INTEGER,
    nickname: STRING(64),
    city: STRING(32),
    province: STRING(32),
    country: STRING(32),
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE
  });

  return Wxuser;
};
