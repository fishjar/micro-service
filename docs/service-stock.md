# 微服务-库存管理 `stock`

## 介绍

- 库存管理

## 数据库

### 仓库表 `warehouse`

| KEY   | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------|--------------|---------|----------|-----------|---------|---------|--------|
| id    | INT          |         | Y        | Y         | Y       |         |        |
| wh_no | VARCHAR(64)  |         |          |           |         |         |        |
| name  | VARCHAR(64)  |         |          |           |         |         |        |
| addr  | VARCHAR(128) |         |          |           |         |         |        |
| admin | INT          |         |          |           |         |         | 管理员    |

### 库存表 `stock`

| KEY          | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|------|---------|----------|-----------|---------|---------|--------|
| id           | INT  |         | Y        | Y         | Y       |         |        |
| warehouse_id | INT  |         |          |           |         |         |        |
| product_id   | INT  |         |          |           |         |         | 冗余字段   |
| sku_id       | INT  |         |          |           |         |         |        |
| amount       | INT  |         |          |           |         |         |        |

### 入库单 `entering`

| KEY           | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------------|--------------|---------|----------|-----------|---------|---------|--------|
| id            | INT          |         | Y        | Y         | Y       |         |        |
| supplier      | VARCHAR(64)  |         |          |           |         |         | 供应商    |
| corp_id       | INT          |         |          |           |         |         | 企业供应商  |
| user_id       | INT          |         |          |           |         |         | 个人供应商  |
| approver      | INT          |         |          |           |         |         | 接收人    |
| deliverer     | VARCHAR(64)  |         |          |           |         |         | 送货人    |
| recipient     | INT          |         |          |           |         |         | 核准人    |
| approved_time | TIMESTAMP    |         |          |           |         |         | 核准时间   |
| entering_time | TIMESTAMP    |         |          |           |         |         | 入库时间   |
| amount        | INT          |         |          |           |         |         | 总数     |
| price         | INT          |         |          |           |         |         | 总价     |
| remark        | VARCHAR(128) |         |          |           |         |         |        |

### 入库详单 `etitem`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | INT          |         | Y        | Y         | Y       |         |        |
| warehouse_id | INT          |         |          |           |         |         |        |
| entering_id  | INT          |         |          |           |         |         |        |
| product_id   | INT          |         |          |           |         |         | 冗余字段   |
| sku_id       | INT          |         |          |           |         |         |        |
| name         | VARCHAR(64)  |         |          |           |         |         |        |
| amount       | INT          |         |          |           |         |         |        |
| unit         | VARCHAR(16)  |         |          |           |         |         |        |
| price        | INT          |         |          |           |         |         |        |
| batch_no     | VARCHAR(64)  |         |          |           |         |         | 批次编号   |
| remark       | VARCHAR(128) |         |          |           |         |         |        |

### 出库单 `outbound`

| KEY           | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------------|--------------|---------|----------|-----------|---------|---------|--------|
| id            | INT          |         | Y        | Y         | Y       |         |        |
| customer      | VARCHAR(64)  |         |          |           |         |         | 客户名    |
| corp_id       | INT          |         |          |           |         |         | 企业客户   |
| user_id       | INT          |         |          |           |         |         | 个人客户   |
| approver      | INT          |         |          |           |         |         | 发货人    |
| deliverer     | VARCHAR(64)  |         |          |           |         |         | 送货人    |
| recipient     | INT          |         |          |           |         |         | 核准人    |
| approved_time | TIMESTAMP    |         |          |           |         |         | 核准时间   |
| outbound_time | TIMESTAMP    |         |          |           |         |         | 出库时间   |
| amount        | INT          |         |          |           |         |         | 总数     |
| price         | INT          |         |          |           |         |         | 总价     |
| remark        | VARCHAR(128) |         |          |           |         |         |        |

### 出库详单 `obitem`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | INT          |         | Y        | Y         | Y       |         |        |
| warehouse_id | INT          |         |          |           |         |         |        |
| outbound_id  | INT          |         |          |           |         |         |        |
| product_id   | INT          |         |          |           |         |         | 冗余字段   |
| sku_id       | INT          |         |          |           |         |         |        |
| name         | VARCHAR(64)  |         |          |           |         |         |        |
| amount       | INT          |         |          |           |         |         |        |
| unit         | VARCHAR(16)  |         |          |           |         |         |        |
| price        | INT          |         |          |           |         |         |        |
| batch_no     | VARCHAR(64)  |         |          |           |         |         | 批次编号   |
| remark       | VARCHAR(128) |         |          |           |         |         |        |

### 批次表 `batch`

| KEY             | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-----------------|--------------|---------|----------|-----------|---------|---------|--------|
| id              | INT          |         | Y        | Y         | Y       |         |        |
| sku_id          | INT          |         |          |           |         |         | 单品ID   |
| corp_id         | INT          |         |          |           |         |         | 供应商    |
| batch_no        | VARCHAR(64)  |         |          |           |         |         | 批次编号   |
| produced_time   | TIMESTAMP    |         |          |           |         |         | 生产时间   |
| expiration_time | TIMESTAMP    |         |          |           |         |         | 过期时间   |
| amount          | INT          |         |          |           |         |         | 库存数量   |
| remark          | VARCHAR(128) |         |          |           |         |         |        |
