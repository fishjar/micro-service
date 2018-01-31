'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Wxapp = app.model.define('wxapp', {
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
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE
  });

  return Wxapp;
};
