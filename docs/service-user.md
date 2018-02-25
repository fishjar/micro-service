# 微服务-用户系统 `user`

## 介绍

- 用户注册、登录、管理及认证服务
- 实现多种注册及登录方式
  - 帐号/手机/邮箱+密码
  - 手机+动态密码
  - 微信/Twitter/Gmail等OAuth认证
- 一个用户需要存在两种以上认证方式才算安全
  - 每种认证方式都设置过期时间，可以用另一种认证方式刷新时间
  - 所有认证方式均过期后，需要判断是新用户还是旧用户
- 利用手机/邮箱识别同人不同端
  - 发现同一个人时，合并用户资料表
  - 认证表指向先认证的那条用户资料
  - 可能还需网关服务修改相关业务记录的user_id
- 此用户系统设计的弊端：
  - 修改密码时需要更新认证表的所有同user_id的记录
  - 修改个人手机/邮箱资料需要同时更新认证表和资料表
  - 合并资料比较麻烦

## 数据库

### 用户认证表 `auth`

| Field       | Type         | Null | Key | Default | Extra          |
|-------------|--------------|------|-----|---------|----------------|
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_id     | INT          |      |     |         |                |
| auth_type   | TINYINT      |      |     |         |                |
| auth_name   | VARCHAR(64)  |      |     |         |                |
| auth_code   | VARCHAR(128) |      |     |         |                |
| expire_time | TIMESTAMP    |      |     |         |                |
| verify_time | TIMESTAMP    |      |     |         |                |

```js
auth_type: {
  1: `username`,
  2: `mobile`,
  3: `email`,
}
```

### 微信用户认证表 `auth_wx`

| Field       | Type     | Null | Key | Default | Extra          |
|-------------|----------|------|-----|---------|----------------|
| id          | int(11)  | NO   | PRI | NULL    | auto_increment |
| user_id     | int(11)  | YES  |     | NULL    |                |
| wxuser_id   | int(11)  | YES  |     | NULL    |                |
| expire_time | datetime | YES  |     | NULL    |                |
| verify_time | datetime | YES  |     | NULL    |                |

### 用户资料表 `user`

| Field    | Type         | Null | Key | Default | Extra          |
|----------|--------------|------|-----|---------|----------------|
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| uuid     | varchar(64)  | YES  |     | NULL    |                |
| name     | varchar(64)  | YES  |     | NULL    |                |
| avatar   | varchar(255) | YES  |     | NULL    |                |
| gender   | int(11)      | YES  |     | NULL    |                |
| nickname | varchar(64)  | YES  |     | NULL    |                |
| city     | varchar(32)  | YES  |     | NULL    |                |
| province | varchar(32)  | YES  |     | NULL    |                |
| country  | varchar(32)  | YES  |     | NULL    |                |

```js
gender: {
  0: `未知`,
  1: `男`,
  2: `女`,
}
```

## API

### 认证（注册、登录）

```sh
POST /login
```

Request

```js
// 密码或动态密码
{
  auth_type: 1,
  auth_name: '34erfw4432',
  auth_code: '****',
  user_info: {}, // 可选
}
// 微信用户，登录失败直接注册
{
  auth_type: 4,
  wxuser: {
    id: 12323
  }
}
```

```js
auth_type: {
  1: `username`,
  2: `mobile`,
  3: `email`,
  4: `wx`,
}
```

Response

```js
{
  user: {},
  auth: {},
}
```

### 获取微信认证信息

```sh
GET /auth_wx/{auth_wx_id}
```

### 修改密码

### 添加用户

```sh
POST /users
```

Request

```js
{
  name: 'zhangsan',
  nickname: 'xiaozhang',
  mobile: '13888888888',
  email: 'zhangsan@test.com',
  gender: 1,
  birthday: 1516602918,
  avatar: '/media/img/123.png',
}
```

Request Parameters

| KEY      | TYPE   | NOT NULL | REMARK |
|----------|--------|----------|--------|
| name     | string |          |        |
| nickname | string |          |        |
| mobile   | string |          |        |
| email    | string |          |        |
| gender   | int    |          |        |
| birthday | int    |          |        |
| avatar   | string |          |        |

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

  id: 322323,
  uuid: 'ABCDEF',
}
```

Response Parameters

| KEY  | TYPE   | NOT NULL | REMARK |
|------|--------|----------|--------|
| id   | string | Y        |        |
| uuid | string | Y        |        |

### 获取用户资料

```sh
GET /users/{user_id}
```

### 更新用户资料

```sh
PUT /users/{user_id}
```
