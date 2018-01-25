# 微服务-支付管理 `pay`

## 介绍

- 支付管理

## 数据库

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
