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
| id           | BIGINT       |         | Y        | Y         | Y       |         |        |
| no           | VARCHAR(64)  |         |          |           |         |         |        |
| user_id      | BIGINT       |         |          |           |         |         |        |
| addr_id      | BIGINT       |         |          |           |         |         |        |
| addr         | VARCHAR(128) |         |          |           |         |         |        |
| express_id   | BIGINT       |         |          |           |         |         |        |
| order_status | TINYINT      |         |          |           |         |         |        |
| order_type   | TINYINT      |         |          |           |         |         |        |
| all_fee      | BIGINT       |         |          |           |         |         |        |
| dis_fee      | BIGINT       |         |          |           |         |         |        |
| exp_fee      | BIGINT       |         |          |           |         |         |        |
| real_fee     | BIGINT       |         |          |           |         |         |        |
| pay_fee      | BIGINT       |         |          |           |         |         |        |
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
| sku_id   | BIGINT      |         |          |           |         |         |        |
| title    | VARCHAR(64) |         |          |           |         |         |        |
| number   | INT         |         |          |           |         |         |        |
| all_fee  | BIGINT      |         |          |           |         |         |        |
| dis_fee  | BIGINT      |         |          |           |         |         |        |
| real_fee | BIGINT      |         |          |           |         |         |        |

### 收件人表 `address`

| KEY       | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----------|--------------|---------|----------|-----------|---------|---------|--------|
| id        | INT          |         | Y        | Y         | Y       |         |        |
| user_id   | BIGINT       |         |          |           |         |         |        |
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