# 微服务-日志系统 `log`

## 介绍

- 用于用户的操作记录以及一些额外信息

## 数据库

### 注册日志表 `register_log`

| KEY             | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----------------|-------------|---------|----------|-----------|---------|---------|--------|
| id              | BIGINT      |         | Y        | Y         | Y       |         |        |
| user_id         | BIGINT      |         |          |           |         | Y       |        |
| register_type   | TINYINT     |         |          |           |         |         |        |
| register_time   | TIMESTAMP   |         |          |           |         |         |        |
| register_ip     | VARCHAR(32) |         |          |           |         |         |        |
| register_client | VARCHAR(32) |         |          |           |         |         |        |

```js
register_type: {
  1: `username`,
  2: `mobile`,
  3: `email`,
  4: `wx openid`,  // 没有unionid才用openid
  5: `wx unionid`, // 4与5不同时用
}
```

### 登录、登出日志表 `login_log`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | BIGINT       |         | Y        | Y         | Y       |         |        |
| user_id     | BIGINT       |         |          |           |         | Y       |        |
| login_type  | TINYINT      |         |          |           |         |         |        |
| command     | TINYINT      |         |          |           |         |         |        |
| version     | VARCHAR(32)  |         |          |           |         |         |        |
| client      | VARCHAR(32)  |         |          |           |         |         |        |
| device_id   | VARCHAR(64)  |         |          |           |         |         |        |
| lastip      | VARCHAR(32)  |         |          |           |         |         |        |
| os          | VARCHAR(16)  |         |          |           |         |         |        |
| osver       | VARCHAR(32)  |         |          |           |         |         |        |
| description | VARCHAR(128) |         |          |           |         |         |        |

```js
login_type: {
  1: `username`,
  2: `mobile`,
  3: `email`,
  4: `wx openid`,  // 没有unionid才用openid
  5: `wx unionid`, // 4与5不同时用
}
command: {
  1: `登陆成功`,
  2: `登出成功`,
  3: `登录失败`,
  4: `登出失败`,
}
```

### 操作日志表 `operate_log`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | BIGINT       |         | Y        | Y         | Y       |         |        |
| user_id      | BIGINT       |         |          |           |         | Y       |        |
| operate_type | TINYINT      |         |          |           |         |         |        |
| description  | VARCHAR(128) |         |          |           |         |         |        |

## API

### 添加注册日志

```sh
POST /logs/register
```

### 添加登录、登出日志

```sh
POST /logs/login
```

### 添加操作日志

```sh
POST /logs/operate
```


