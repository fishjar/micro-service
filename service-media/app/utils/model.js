'use strict';

module.exports = Sequelize => {
  const { STRING, INTEGER, DATE } = Sequelize;
  return {

    media: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: INTEGER,
      media_type: INTEGER,
      title: STRING(64),
      name: STRING(64),
      ext: STRING(4),
      path: STRING(128),
      url: STRING(128),
      description: STRING(255),
      size: INTEGER,
      width: INTEGER,
      height: INTEGER,

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

  };
};
