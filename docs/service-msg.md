# 微服务-消息 `msg`

## 介绍

- 主要是短信的发送服务
- 手机动态密码及邮箱验证

## 数据库

### 信息验证表 `verify`

| KEY           | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE        |
|---------------|--------------|---------|----------|-----------|---------|---------|---------------|
| id            | INT          |         | Y        | Y         | Y       |         |               |
| verify_type   | TINYINT      |         | Y        |           |         |         |               |
| verify_name   | VARCHAR(64)  |         | Y        |           |         |         | `13888888888` |
| verify_code   | VARCHAR(128) |         | Y        |           |         |         | `123456`      |
| verify_expire | TIMESTAMP    |         | Y        |           |         |         |               |
| use_time      | TIMESTAMP    |         |          |           |         |         |               |

```JS
verify_type: {
  1: `mobile`,
  2: `email`,
}
```

### 信息发送表 `msg`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| msg_type    | TINYINT      |         | Y        |           |         |         |        |
| description | VARCHAR(64)  |         |          |           |         |         |        |
| sendto      | VARCHAR(64)  |         |          |           |         |         |        |
| content     | VARCHAR(128) |         |          |           |         |         |        |

## API

### 发送验证码

```sh
POST /verifys
```

Request

```js
{
  verify_type: 1,
  verify_name: '13888888888',
}
```

Response

```js
{
  verify_type: 1,
  verify_name: '13888888888',
  verify_code,
}
```

### 认证验证码

```sh
POST /verify
```

```js
{
  verify_type: 1,
  verify_name: '13888888888',
  verify_code: '343423423',
}
```

Response

```js
{
  verify_type: 1,
  verify_name: '13888888888',
  verify_code: '343423423',
  verify_expire,
  use_time,
  verify_result: 1, // 0不存在，1成功，2过期，3已使用
}
```

### 发送短信

```sh
POST /msgs
```

Request

```js
{
  msg_type: 1,
  description: '232',
  sendto: '13888888888',
  content: 'wewqewewew',
}
```
