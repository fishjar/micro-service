# 微服务-库存管理 `stock`

## 介绍

- 库存管理

## 数据库

### 仓库表 `warehouse`

| KEY   | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------|--------------|---------|----------|-----------|---------|---------|--------|
| id    | INT          |         | Y        | Y         | Y       |         |        |
| no    | VARCHAR(64)  |         |          |           |         |         |        |
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
| supplier      | INT          |         |          |           |         |         | 供应商    |
| approver      | INT          |         |          |           |         |         | 接收人    |
| deliverer     | VARCHAR(64)  |         |          |           |         |         | 送货人    |
| recipient     | INT          |         |          |           |         |         | 核准人    |
| entering_time | TIMESTAMP    |         |          |           |         |         |        |
| remark        | VARCHAR(128) |         |          |           |         |         |        |

### 入库详单 `entering_detail`

| KEY           | TYPE      | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------------|-----------|---------|----------|-----------|---------|---------|--------|
| id            | INT       |         | Y        | Y         | Y       |         |        |
| warehouse_id  | INT       |         |          |           |         |         |        |
| entering_id   | INT       |         |          |           |         |         |        |
| product_id    | INT       |         |          |           |         |         | 冗余字段   |
| sku_id        | INT       |         |          |           |         |         |        |
| amount        | INT       |         |          |           |         |         |        |
| price         | INT       |         |          |           |         |         |        |
| complete_time | TIMESTAMP |         |          |           |         |         |        |

### 出库单 `outbound`

| KEY           | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------------|--------------|---------|----------|-----------|---------|---------|--------|
| id            | INT          |         | Y        | Y         | Y       |         |        |
| customer      | INT          |         |          |           |         |         | 客户     |
| approver      | INT          |         |          |           |         |         | 发货人    |
| sender        | VARCHAR(64)  |         |          |           |         |         | 收货人    |
| recipient     | INT          |         |          |           |         |         | 核准人    |
| outbound_time | TIMESTAMP    |         |          |           |         |         |        |
| remark        | VARCHAR(128) |         |          |           |         |         |        |

### 出库详单 `outbound_detail`

| KEY           | TYPE      | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------------|-----------|---------|----------|-----------|---------|---------|--------|
| id            | INT       |         | Y        | Y         | Y       |         |        |
| warehouse_id  | INT       |         |          |           |         |         |        |
| outbound_id   | INT       |         |          |           |         |         |        |
| product_id    | INT       |         |          |           |         |         | 冗余字段   |
| sku_id        | INT       |         |          |           |         |         |        |
| amount        | INT       |         |          |           |         |         |        |
| price         | INT       |         |          |           |         |         |        |
| complete_time | TIMESTAMP |         |          |           |         |         |        |
