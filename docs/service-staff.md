# 微服务-员工管理 `staff`

## 介绍

- 员工管理

## 数据库

### 员工表 `staff`

| KEY        | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|-------------|---------|----------|-----------|---------|---------|--------|
| id         | INT         |         | Y        | Y         | Y       |         |        |
| user_id    | INT         |         |          |           |         | Y       |        |
| staff_id   | VARCHAR(16) |         |          |           |         |         |        |
| title      | VARCHAR(16) |         |          |           |         |         |        |
| entry_time | TIMESTAMP   |         |          |           |         |         |        |

### 角色表 `role`

| KEY  | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------|-------------|---------|----------|-----------|---------|---------|--------|
| id   | INT         |         | Y        | Y         | Y       |         |        |
| name | VARCHAR(64) |         |          |           |         |         |        |

### 资源表 `resource`

| KEY         | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|-------------|---------|----------|-----------|---------|---------|--------|
| id          | INT         |         | Y        | Y         | Y       |         |        |
| rank        | INT         |         |          |           |         |         |        |
| action      | TINYINT     |         |          |           |         |         |        |
| name        | VARCHAR(32) |         |          |           |         |         |        |
| description | VARCHAR(64) |         |          |           |         |         |        |

```js
action: {
  1: `增`,
  2: `删`,
  3: `改`,
  4: `查`,
}
```

### 权限表 `permission`

| KEY         | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|------|---------|----------|-----------|---------|---------|--------|
| id          | INT  |         | Y        | Y         | Y       |         |        |
| role_id     | INT  |         |          |           |         |         |        |
| resource_id | INT  |         |          |           |         |         |        |

### 员工-角色表 `staff_role`

| KEY      | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|----------|------|---------|----------|-----------|---------|---------|--------|
| id       | INT  |         | Y        | Y         | Y       |         |        |
| staff_id | INT  |         |          |           |         |         |        |
| role_id  | INT  |         |          |           |         |         |        |

### 组织机构表 `org`

| KEY  | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------|-------------|---------|----------|-----------|---------|---------|--------|
| id   | INT         |         | Y        | Y         | Y       |         |        |
| name | VARCHAR(64) |         |          |           |         |         |        |

### 员工-机构表 `staff_org`

| KEY      | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|----------|------|---------|----------|-----------|---------|---------|--------|
| id       | INT  |         | Y        | Y         | Y       |         |        |
| staff_id | INT  |         |          |           |         |         |        |
| org_id   | INT  |         |          |           |         |         |        |

