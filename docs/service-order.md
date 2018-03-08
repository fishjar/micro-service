# 微服务-订单管理 `order`

## 介绍

- 订单管理

## 数据库

```sh
订单详情->订单->收件人
促销->订单
```

### 订单表 `order`

| KEY           | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK  |
|---------------|--------------|---------|----------|-----------|---------|---------|---------|
| id            | INT          |         | Y        | Y         | Y       |         |         |
| order_no      | VARCHAR(64)  |         |          |           |         |         | 订单编号，唯一 |
| order_type    | TINYINT      | 0       |          |           |         |         | 订单类型    |
| user_id       | INT          |         |          |           |         |         | 用户ID    |
| crop_id       | INT          |         |          |           |         |         | 企业用户ID  |
| address_id    | INT          |         |          |           |         |         | 收件人地址ID |
| address       | VARCHAR(255) |         |          |           |         |         | 地址快照    |
| waybill_id    | INT          |         |          |           |         |         | 快递单ID   |
| order_status  | TINYINT      | 1       |          |           |         |         | 订单状态    |
| bag_status    | TINYINT      | 1       |          |           |         |         | 货物状态    |
| pay_status    | TINYINT      | 1       |          |           |         |         | 支付状态    |
| shipping_type | TINYINT      | 0       |          |           |         |         | 配送方式    |
| all_fee       | INT          |         |          |           |         |         | 总金额     |
| dis_fee       | INT          |         |          |           |         |         | 折扣金额    |
| coupon_fee    | INT          |         |          |           |         |         | 代金券     |
| exp_fee       | INT          |         |          |           |         |         | 运费金额    |
| real_fee      | INT          |         |          |           |         |         | 实际需付金额  |
| pay_fee       | INT          |         |          |           |         |         | 已付金额    |
| pay_time      | TIMESTAMP    |         |          |           |         |         | 付清全款时间  |
| cancel_time   | TIMESTAMP    |         |          |           |         |         | 取消时间    |
| remark        | TEXT         |         |          |           |         |         | 备注      |

```js
order_type: {
  0: "默认类型",
}
// 订单状态
// 全部订单/待付款/待收货/待评价
// 提交订单/付款成功/商品出库/等待收货/完成
order_status: {
  0: "已关闭",
  1: "已创建",
  2: "已支付",
  3: "已确认",
  4: "已发货",
  5: "已完成",
  6: "已评价",
  7: "已取消",
},
// 订单状态（作废）
order_status: {
  0: "已关闭",
  1: "已下单，待支付",
  2: "已付定金，待确认",
  3: "已付全款，待确认",
  4: "已确认，待出库",
  5: "已出库，待发货",
  6: "已发货，待收货",
  7: "已收货，待评价",
  8: "申请退货，待确认",
  9: "退货已确认，待客户发货",
  10: "客户已发货，待收货（验货）",
  11: "已（收货）验货，待确认退款",
  12: "退款已确认，待退款",
  13: "已退款，待客户收款",
  14: "客户已收款，待评价",
  15: "已评价（完成）",
  15: "已取消",
},
// 货物状态
bag_status：{
  0: "已关闭",
  1: "订单已确认，待（打包）出库",
  2: "已（打包）出库，待发货",
  3: "已发货，待收货",
  4: "已收货，完成",
  5: "客户申请退货，待确认",
  6: "退货已确认，待客户发货",
  7: "客户已发货，待验货",
  8: "已验货，退货完成",
},
// 支付状态
pay_status: {
  0: "已关闭",
  1: "已下单，待支付",
  2: "已支付定金",
  3: "已支付全款",
  4: "客户申请退款，待确认",
  5: "退款已确认，待退款",
  6: "已退款，待客户确认收款",
  7: "客户已收款，退款完成",
}
// 配送方式
shipping_type: {
  0: "默认", //无需配送
  1: "快递",
}
```

### 订单详情表 `oditem`

- 多个冗余字段，用来保存商品快照

| KEY          | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|-------------|---------|----------|-----------|---------|---------|--------|
| id           | INT         |         | Y        | Y         | Y       |         |        |
| sku_id       | INT         |         |          |           |         |         |        |
| number       | INT         |         |          |           |         |         | 数量     |
| all_fee      | INT         |         |          |           |         |         | 总价     |
| dis_fee      | INT         |         |          |           |         |         | 折扣     |
| real_fee     | INT         |         |          |           |         |         | 实际支付   |
| product_id   | INT         |         |          |           |         |         | 冗余字段   |
| product_name | VARCHAR(64) |         |          |           |         |         | 冗余字段   |
| sku_fee      | INT         |         |          |           |         |         | 冗余字段   |
| sku_name     | VARCHAR(64) |         |          |           |         |         | 冗余字段   |
| sku_no       | VARCHAR(64) |         |          |           |         |         | 冗余字段   |
| sku_extend   | TEXT        |         |          |           |         |         | 冗余字段   |
| sku_subs     | TEXT        |         |          |           |         |         | 冗余字段   |
| sku_unit     | VARCHAR(16) |         |          |           |         |         | 冗余字段   |

### 收件人表 `address`

| KEY       | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-----------|--------------|---------|----------|-----------|---------|---------|--------|
| id        | INT          |         | Y        | Y         | Y       |         |        |
| user_id   | INT          |         |          |           |         |         |        |
| name      | VARCHAR(64)  |         |          |           |         |         |        |
| phone     | VARCHAR(16)  |         |          |           |         |         |        |
| mobile    | VARCHAR(16)  |         |          |           |         |         |        |
| country   | VARCHAR(64)  |         |          |           |         |         |        |
| province  | VARCHAR(64)  |         |          |           |         |         |        |
| city      | VARCHAR(64)  |         |          |           |         |         |        |
| dist      | VARCHAR(64)  |         |          |           |         |         |        |
| road      | VARCHAR(64)  |         |          |           |         |         |        |
| addr      | VARCHAR(128) |         |          |           |         |         |        |
| latitude  | FLOAT        |         |          |           |         |         |        |
| longitude | FLOAT        |         |          |           |         |         |        |

### 促销表 `odpromo`

| KEY | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-----|------|---------|----------|-----------|---------|---------|--------|
| id  | INT  |         | Y        | Y         | Y       |         |        |

### 快递单表 `waybill`

| KEY        | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK      |
|------------|--------------|---------|----------|-----------|---------|---------|-------------|
| id         | INT          |         | Y        | Y         | Y       |         |             |
| name       | VARCHAR(64)  |         |          |           |         |         |             |
| express_id | INT          |         |          |           |         |         |             |
| waybill_no | VARCHAR(64)  |         |          |           |         |         |             |
| from_name  | VARCHAR(64)  |         |          |           |         |         |             |
| from_phone | VARCHAR(16)  |         |          |           |         |         |             |
| from_addr  | VARCHAR(128) |         |          |           |         |         |             |
| from_code  | VARCHAR(6)   |         |          |           |         |         | 邮编          |
| to_name    | VARCHAR(64)  |         |          |           |         |         |             |
| to_phone   | VARCHAR(16)  |         |          |           |         |         |             |
| to_addr    | VARCHAR(128) |         |          |           |         |         |             |
| to_code    | VARCHAR(6)   |         |          |           |         |         |             |
| operator   | INT          |         |          |           |         |         | 经手人，用户ID/工号 |
| remark     | VARCHAR(255) |         |          |           |         |         |             |

### 快递公司表 `express`

| KEY     | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------|-------------|---------|----------|-----------|---------|---------|--------|
| id      | INT         |         | Y        | Y         | Y       |         |        |
| name    | VARCHAR(64) |         |          |           |         |         |        |
| corp_id | INT         |         |          |           |         |         |        |

### 支付表 `pay`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| order_id    | INT          |         |          |           |         |         | 订单ID   |
| order_no    | VARCHAR(64)  |         |          |           |         |         |        |
| pay_type    | TINYINT      |         |          |           |         |         | 支付方式   |
| thirdpay_id | INT          |         |          |           |         |         | 微信支付ID |
| thirdpay_no | VARCHAR(64)  |         |          |           |         |         | 微信的订单号 |
| pay_fee     | INT          |         |          |           |         |         | 支付金额   |
| pay_result  | TINYINT      |         |          |           |         |         | 支付结果   |
| pay_time    | TIMESTAMP    |         |          |           |         |         | 支付时间   |
| remark      | VARCHAR(128) |         |          |           |         |         | 备注     |

```js
pay_type: {
  1: "微信支付"，
  2: "支付宝",
},
pay_result: {
  0: "待确认",
  1: "支付成功",
  2: "支付失败",
}
```

## API