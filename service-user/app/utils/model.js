export default Sequelize => {
  const { STRING, INTEGER, DATE } = Sequelize;
  return {
    user: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: STRING(32),
      name: STRING(64),
      avatar: STRING(128),
      gender: INTEGER,
      nickname: STRING(64),
      city: STRING(32),
      province: STRING(32),
      country: STRING(32),
      status: {
        type: INTEGER,
        defaultValue: 0
      },
      created_at: DATE,
      updated_at: DATE
    },
    auth_wx: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: INTEGER,
      wxuser_id: INTEGER,
      status: {
        type: INTEGER,
        defaultValue: 0
      },
      created_at: DATE,
      updated_at: DATE
    },
  }
};