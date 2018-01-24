# 微服务-微信 `wx`

## 介绍

- 管理微信公众号，企业号，小程序等
- 与微信对接的服务
  - 实现维护令牌
  - 通过code获取微信个人资料

## 数据库

### 微信公众号，企业号，小程序表 `wxapp`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | INT          |         | Y        | Y         | Y       |         |        |
| app_type     | TINYINT      |         |          |           |         |         |        |
| name         | VARCHAR(64)  |         |          |           |         |         |        |
| appid        | VARCHAR(32)  |         | Y        |           |         |         |        |
| secret       | VARCHAR(128) |         |          |           |         |         |        |
| access_token | VARCHAR(128) |         |          |           |         |         |        |
| expires_in   | TIMESTAMP    |         |          |           |         |         |        |

```js
app_type: {
  1: `公众号`,
  2: `企业号`,
  3: `小程序`,
}
```

### 微信用户表 `wxuser`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| appid       | VARCHAR(32)  |         | Y        |           |         |         |        |
| unionid     | VARCHAR(32)  |         |          |           |         |         |        |
| openid      | VARCHAR(32)  |         |          |           |         |         |        |
| session_key | VARCHAR(64)  |         |          |           |         |         |        |
| name        | VARCHAR(64)  |         |          |           |         |         |        |
| avatar      | VARCHAR(128) |         |          |           |         |         |        |
| gender      | TINYINT      |         |          |           |         |         |        |
| nickname    | VARCHAR(64)  |         |          |           |         |         |        |
| city        | VARCHAR(32)  |         |          |           |         |         |        |
| province    | VARCHAR(32)  |         |          |           |         |         |        |
| country     | VARCHAR(32)  |         |          |           |         |         |        |

## API

### 添加公众号

```sh
POST /wxapps
```

Request

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',
}
```

Request Parameters

| KEY      | TYPE   | NOT NULL | NOTICE |
|----------|--------|----------|--------|
| app_type | int    | Y        |        |
| name     | string | Y        |        |
| appid    | string | Y        |        |
| secret   | string |          |        |

Response

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',

  id: `1323`,
}
```

### 获取公众号

```sh
GET /wxapps/{wxapp_id}
```

Request Parameters

| KEY      | TYPE | NOT NULL | NOTICE |
|----------|------|----------|--------|
| wxapp_id | int  | Y        |        |

Response

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',
  id: `1323`,
}
```

### 修改公众号

```sh
PUT /wxapps/{wxapp_id}
```

Request

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',
}
```

### 添加微信用户资料

```sh
POST /wxusers
```

Request

```js
{
  appid: 'wewrwrwere',
  unionid: '234234',
  openid: '3werwerewr',
  session_key: '**********',
  name: '',
  avatar: '',
  gender: 1,
  nickname: '',
  city: '',
  province: '',
  country: '',
}
```

### 获取微信用户资料

```sh
GET /wxusers/{appid}/{openid/unionid}
```

Request

```js
{
  appid: '23e2wee',
  unionid: '234234',
  openid: '3werwerewr',
}
```

Response

```js
{
  id: 12,
  appid: 'wewrwrwere',
  unionid: '234234',
  openid: '3werwerewr',
  session_key: '**********',
  name: '',
  avatar: '',
  gender: 1,
  nickname: '',
  city: '',
  province: '',
  country: '',
}
```

### 修改微信用户资料

```sh
PUT /wxusers/{appid}/{openid/unionid}
```

### 微信登录

- `userinfo` 表示自动创建用户资料，减少API调用次数

```sh
POST /wxlogin
```

Request

```js
{
  appid: 'sdfdfdsfd',
  code: '123124234234',

  userinfo: {}, // 小程序获取的基本信息
}
```

Response

```js
{
  name: 'zhangsan',
  nickname: 'laozhang',
  mobile: '13888888888',
  email: 'zhangsan@test.com',
  gender: 1,
  birthday: 1516602918,
  avatar: '/media/img/123.png',

  id: 'DEF123',
  unionid: 'sdfdfdfdsdfd',
  openid: 'sdfsdfdsfd',
}
```
