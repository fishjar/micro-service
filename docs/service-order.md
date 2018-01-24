# 微服务-商品管理 `product`

## 介绍

- 订单管理

## 数据库

```sh
订单详情->订单->收件人
促销->订单
```

### 订单表 `order`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | INT          |         | Y        | Y         | Y       |         |        |
| no           | VARCHAR(64)  |         |          |           |         |         |        |
| user_id      | INT          |         |          |           |         |         |        |
| addr_id      | INT          |         |          |           |         |         |        |
| addr         | VARCHAR(128) |         |          |           |         |         |        |
| express_id   | INT          |         |          |           |         |         |        |
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

| KEY      | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|----------|-------------|---------|----------|-----------|---------|---------|--------|
| id       | INT         |         | Y        | Y         | Y       |         |        |
| sku_id   | INT         |         |          |           |         |         |        |
| title    | VARCHAR(64) |         |          |           |         |         |        |
| number   | INT         |         |          |           |         |         |        |
| all_fee  | INT         |         |          |           |         |         |        |
| dis_fee  | INT         |         |          |           |         |         |        |
| real_fee | INT         |         |          |           |         |         |        |

### 收件人表 `address`

| KEY       | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----------|--------------|---------|----------|-----------|---------|---------|--------|
| id        | INT          |         | Y        | Y         | Y       |         |        |
| user_id   | INT          |         |          |           |         |         |        |
| name      | VARCHAR(64)  |         |          |           |         |         |        |
| country   | VARCHAR(64)  |         |          |           |         |         |        |
| province  | VARCHAR(64)  |         |          |           |         |         |        |
| city      | VARCHAR(64)  |         |          |           |         |         |        |
| dist      | VARCHAR(64)  |         |          |           |         |         |        |
| road      | VARCHAR(64)  |         |          |           |         |         |        |
| addr      | VARCHAR(128) |         |          |           |         |         |        |
| latitude  | FLOAT        |         |          |           |         |         |        |
| longitude | FLOAT        |         |          |           |         |         |        |

### 促销表 `order_promo`

| KEY | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----|------|---------|----------|-----------|---------|---------|--------|
| id  | INT  |         | Y        | Y         | Y       |         |        |

### 快递表 `express`

| KEY      | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|----------|-------------|---------|----------|-----------|---------|---------|--------|
| id       | INT         |         | Y        | Y         | Y       |         |        |
| name     | VARCHAR(64) |         |          |           |         |         |        |
| exp_type | TINYINT     |         |          |           |         |         |        |
| exp_code | VARCHAR(64) |         |          |           |         |         |        |

```js
exp_type: {
  0: '其他',
  1: '顺丰',
  2: 'EMS',
  3: '',
}
```

## API