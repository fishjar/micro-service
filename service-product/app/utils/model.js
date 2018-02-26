'use strict';

module.exports = Sequelize => {
  const { STRING, INTEGER, DATE, FLOAT, TEXT } = Sequelize;
  return {

    cat: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: STRING(64),
      pid: INTEGER,
      is_parent: {
        type: STRING(1),
        defaultValue: 'N',
      },
      sort: {
        type: INTEGER,
        defaultValue: 0,
      },
      description: STRING(128),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    corporation: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: STRING(64),
      corp_code: STRING(64),
      phone: STRING(16),
      mobile: STRING(16),
      fax: STRING(16),
      email: STRING(64),
      country: STRING(64),
      province: STRING(64),
      city: STRING(64),
      dist: STRING(64),
      road: STRING(64),
      addr: STRING(128),
      latitude: FLOAT,
      longitude: FLOAT,
      description: STRING(128),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    brand: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      corp_id: INTEGER,
      cat_id: INTEGER,
      name_en: STRING(64),
      name_cn: STRING(64),
      description: STRING(255),
      logo: STRING(255),
      website: STRING(128),
      story: TEXT,

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    product: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      brand_id: INTEGER,
      cat_id: INTEGER,
      manufacturer: INTEGER,
      name: STRING(64),
      price: {
        type: INTEGER,
        defaultValue: 0,
      },
      product_status: {
        type: INTEGER,
        defaultValue: 0,
      },
      unit: STRING(16),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    sku: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      product_id: INTEGER,
      name: STRING(64),
      no: STRING(64),
      price: {
        type: INTEGER,
        defaultValue: 0,
      },
      sku_status: {
        type: INTEGER,
        defaultValue: 0,
      },
      extend: TEXT,
      product_code: STRING(64),
      bar_code: STRING(64),
      is_pack: {
        type: STRING(1),
        defaultValue: 'N',
      },
      subs: TEXT,
      unit: STRING(16),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    pron: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cat_id: INTEGER,
      pron_type: INTEGER,
      is_sku: {
        type: STRING(1),
        defaultValue: 'N',
      },
      name: STRING(64),
      sort: {
        type: INTEGER,
        defaultValue: 0,
      },

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    product_pron: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      pron_id: INTEGER,
      product_id: INTEGER,
      is_suk: {
        type: STRING(1),
        defaultValue: 'N',
      },
      suk_id: INTEGER,
      value: STRING(255),
      image: STRING(255),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },



  };
};
