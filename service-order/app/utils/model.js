'use strict';

module.exports = Sequelize => {
  const { STRING, INTEGER, DATE, FLOAT, TEXT } = Sequelize;
  return {

    order: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      order_no: STRING(64),
      order_type: INTEGER,
      user_id: INTEGER,
      crop_id: INTEGER,
      address_id: INTEGER,
      address: STRING(255),
      waybill_id: INTEGER,
      order_status: INTEGER,
      bag_status: INTEGER,
      pay_status: INTEGER,
      shipping_type: INTEGER,
      all_fee: INTEGER,
      dis_fee: INTEGER,
      coupon_fee: INTEGER,
      exp_fee: INTEGER,
      real_fee: INTEGER,
      pay_fee: INTEGER,
      pay_time: DATE,
      cancel_time: DATE,
      remark: TEXT,

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    oditem: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      sku_id: INTEGER,
      number: INTEGER,
      all_fee: INTEGER,
      dis_fee: INTEGER,
      real_fee: INTEGER,
      product_id: INTEGER,
      product_name: STRING(64),
      sku_fee: INTEGER,
      sku_name: STRING(64),
      sku_no: STRING(64),
      sku_extend: TEXT,
      sku_subs: TEXT,
      sku_unit: STRING(16),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    address: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: INTEGER,
      name: STRING(64),
      phone: STRING(16),
      mobile: STRING(64),
      country: STRING(64),
      province: STRING(64),
      city: STRING(64),
      dist: STRING(64),
      road: STRING(64),
      addr: STRING(128),
      latitude: FLOAT,
      longitude: FLOAT,

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    waybill: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: STRING(64),
      express_id: INTEGER,
      waybill_no: STRING(64),
      from_name: STRING(64),
      from_phone: STRING(16),
      from_addr: STRING(128),
      from_code: STRING(6),
      to_name: STRING(64),
      to_phone: STRING(16),
      to_addr: STRING(128),
      to_code: STRING(6),
      operator: INTEGER,
      remark: STRING(255),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    express: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: STRING(64),
      corp_id: INTEGER,

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

    pay: {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      order_id: INTEGER,
      order_no: STRING(64),
      pay_type: INTEGER,
      thirdpay_id: INTEGER,
      thirdpay_no: STRING(64),
      pay_fee: INTEGER,
      pay_result: INTEGER,
      pay_time: DATE,
      remark: STRING(128),

      status: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    },

  };
};
