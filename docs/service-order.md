# 微服务-订单管理 `order`

## 介绍

- 订单管理

## 数据库

```sh
订单详情->订单->收件人
促销->订单
```

### 订单表 `order`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | INT          |         | Y        | Y         | Y       |         |        |
| no           | VARCHAR(64)  |         |          |           |         |         |        |
| user_id      | INT          |         |          |           |         |         |        |
| crop_id      | INT          |         |          |           |         |         |        |
| address_id   | INT          |         |          |           |         |         |        |
| address      | VARCHAR(128) |         |          |           |         |         | 地址快照   |
| waybill_id   | INT          |         |          |           |         |         |        |
| order_status | TINYINT      |         |          |           |         |         |        |
| order_type   | TINYINT      |         |          |           |         |         |        |
| all_fee      | INT          |         |          |           |         |         |        |
| dis_fee      | INT          |         |          |           |         |         |        |
| exp_fee      | INT          |         |          |           |         |         |        |
| real_fee     | INT          |         |          |           |         |         |        |
| pay_fee      | INT          |         |          |           |         |         |        |
| pay_time     | TIMESTAMP    |         |          |           |         |         |        |

```js
order_status: {
  0,
}
order_type: {
  0,
}
```

### 订单详情表 `order_detail`

| KEY      | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|----------|-------------|---------|----------|-----------|---------|---------|--------|
| id       | INT         |         | Y        | Y         | Y       |         |        |
| sku_id   | INT         |         |          |           |         |         |        |
| title    | VARCHAR(64) |         |          |           |         |         |        |
| number   | INT         |         |          |           |         |         |        |
| all_fee  | INT         |         |          |           |         |         |        |
| dis_fee  | INT         |         |          |           |         |         |        |
| real_fee | INT         |         |          |           |         |         |        |

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

### 促销表 `order_promo`

| KEY | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-----|------|---------|----------|-----------|---------|---------|--------|
| id  | INT  |         | Y        | Y         | Y       |         |        |

### 快递单表 `waybill`

| KEY        | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|-------------|---------|----------|-----------|---------|---------|--------|
| id         | INT         |         | Y        | Y         | Y       |         |        |
| name       | VARCHAR(64) |         |          |           |         |         |        |
| express_id | INT         |         |          |           |         |         |        |
| no         | VARCHAR(64) |         |          |           |         |         |        |

### 快递公司表 `express`

| KEY     | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------|------|---------|----------|-----------|---------|---------|--------|
| id      | INT  |         | Y        | Y         | Y       |         |        |
| corp_id | INT  |         |          |           |         |         |        |

### 支付表 `pay`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | INT          |         | Y        | Y         | Y       |         |        |
| order_id     | INT          |         |          |           |         |         |        |
| pay_type     | TINYINT      |         |          |           |         |         |        |
| out_trade_no | VARCHAR(32)  |         |          |           |         |         |        |
| body         | VARCHAR(128) |         |          |           |         |         |        |
| detail       | TEXT(6000)   |         |          |           |         |         |        |
| attach       | VARCHAR(128) |         |          |           |         |         |        |
| total_fee    | INT          |         |          |           |         |         |        |
| result_code  | String(16)   |         |          |           |         |         |        |
| time_expire  | VARCHAR(14)  |         |          |           |         |         |        |

## API