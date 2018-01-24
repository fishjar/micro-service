# 微服务-员工管理 `staff`

## 介绍

- 员工管理

## 数据库

### 权限表 `permission`

| KEY  | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------|-------------|---------|----------|-----------|---------|---------|--------|
| id   | INT         |         | Y        | Y         | Y       |         |        |
| name | VARCHAR(64) |         |          |           |         |         |        |
| rank | INT         |         |          |           |         |         |        |

```js
rank: {
  1: ``,
  2: ``,
  4: ``,
  8: ``,
  16: ``,
  32: ``,
}
```

### 员工表 `staff`

| KEY        | TYPE      | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|-----------|---------|----------|-----------|---------|---------|--------|
| id         | INT       |         | Y        | Y         | Y       |         |        |
| user_id    | INT       |         |          |           |         |         |        |
| permission | INT       |         |          |           |         |         |        |
| entry_time | TIMESTAMP |         |          |           |         |         |        |

### 职务表 `job`

| KEY  | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------|-------------|---------|----------|-----------|---------|---------|--------|
| id   | INT         |         | Y        | Y         | Y       |         |        |
| pid  | INT         |         |          |           |         |         |        |
| name | VARCHAR(64) |         |          |           |         |         |        |
| rank | INT         |         |          |           |         |         |        |

### 员工-职务表 `staff_job`

| KEY      | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|----------|------|---------|----------|-----------|---------|---------|--------|
| id       | INT  |         | Y        | Y         | Y       |         |        |
| staff_id |      |         |          |           |         |         |        |
| job_id   |      |         |          |           |         |         |        |