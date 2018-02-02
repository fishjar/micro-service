'use strict';

module.exports = Sequelize => {
  const { STRING, INTEGER, DATE } = Sequelize;
  return {
    wxapp: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      app_type: INTEGER,
      wxmch_id: INTEGER,
      name: STRING(32),
      appid: STRING(32),
      secret: STRING(32),
      access_token: STRING(32),
      expires_in: DATE,
      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },
    wxuser: {
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
      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },
  };
};
