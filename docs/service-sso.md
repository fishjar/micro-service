# 微服务-用户系统 `SSO`

## 介绍

- 用户注册、登录、管理及鉴权服务
- 实现多种注册及登录方式
  - 帐号/手机/邮箱+密码
  - 手机+动态密码
  - 微信/Twitter/Gmail等OAuth鉴权
- 一个用户需要存在两种以上鉴权方式才算安全
  - 每种鉴权方式都设置过期时间，可以用另一种鉴权方式刷新时间
  - 所有鉴权方式均过期后，需要判断是新用户还是旧用户
- 利用手机/邮箱识别同人不同端
  - 发现同一个人时，合并用户资料表
  - 鉴权表指向先鉴权的那条用户资料
  - 可能还需网关服务修改相关业务记录的user_id
- 此用户系统设计的弊端：
  - 修改密码时需要更新鉴权表的所有同user_id的记录
  - 修改个人手机/邮箱资料需要同时更新鉴权表和资料表
  - 合并资料比较麻烦

## 数据库

### 用户鉴权表 `auth`

| KEY          | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|--------------|--------------|---------|----------|-----------|---------|---------|--------|
| id           | BIGINT       |         | Y        | Y         | Y       |         |        |
| user_id      | BIGINT       |         | Y        |           |         | Y       |        |
| auth_type    | TINYINT      |         | Y        |           |         |         |        |
| auth_name    | VARCHAR(64)  |         | Y        |           |         |         |        |
| auth_code    | VARCHAR(128) |         |          |           |         |         |        |
| auth_expire  | TIMESTAMP    |         |          |           |         |         |        |
| verify_time  | TIMESTAMP    |         | Y        |           |         |         |        |
| permission   | INT          |         |          |           |         |         |        |
| token        | VARCHAR(128) |         |          |           |         |         |        |
| token_expire | TIMESTAMP    |         |          |           |         |         |        |

- 当`auth_type`取值1/2/3时
  - `auth_name` 为微信 用户名、手机、邮箱
  - `auth_code` 为密码，需加密
- 当`auth_type`取值4/5时
  - `auth_name` 为微信 `appid`
  - `auth_code` 为微信 `openid`、`unionid`，不加密

```js
auth_type: {
  1: `username`,
  2: `mobile`,
  3: `email`,
  4: `wx openid`,  // 没有unionid才用openid
  5: `wx unionid`, // 4与5不同时用
}
```

### 用户资料表 `user`

| KEY      | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|----------|--------------|---------|----------|-----------|---------|---------|--------|
| id       | BIGINT       |         | Y        | Y         | Y       |         |        |
| uuid     | VARCHAR(32)  |         | Y        |           |         |         |        |
| name     | VARCHAR(64)  |         |          |           |         |         |        |
| nickname | VARCHAR(64)  |         |          |           |         |         |        |
| mobile   | VARCHAR(16)  |         |          |           |         |         |        |
| email    | VARCHAR(64)  |         |          |           |         |         |        |
| gender   | TINYINT      |         |          |           |         |         |        |
| birthday | TIMESTAMP    |         |          |           |         |         |        |
| avatar   | VARCHAR(128) |         |          |           |         |         |        |

```js
gender: {
  0: `未知`,
  1: `男`,
  2: `女`,
}
```

## API

### 用户注册

```sh
POST /users
```

Request

```js
{
  auth_type: 1,
  auth_name: 'sdfdsf',
  auth_code: '*********',
  permission: 1,

  user: {
    name: 'zhangsan',
    nickname: 'xiaozhang',
    mobile: '13888888888',
    email: 'zhangsan@test.com',
    gender: 1,
    birthday: 1516602918,
    avatar: '/media/img/123.png',
  }
}
```

Response

```js
{
  user_id: 'werew53243',
  verify_time: 1516602918,
  permission: 1,
  auth_type: 1,
  auth_name: '232132',

  user: {
    name: 'zhangsan',
    nickname: 'laozhang',
    mobile: '13888888888',
    email: 'zhangsan@test.com',
    gender: 1,
    birthday: 1516602918,
    avatar: '/media/img/123.png',

    id: 'DEF123',
    uuid: 'ABCDEF',
  },

}
```

Response Parameters

| KEY  | TYPE   | NOT NULL | NOTICE |
|------|--------|----------|--------|
| id   | string | Y        |        |
| uuid | string | Y        |        |

### 添加用户信息

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

| KEY      | TYPE   | NOT NULL | NOTICE |
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

  id: 'DEF123',
  uuid: 'ABCDEF',
}
```

Response Parameters

| KEY  | TYPE   | NOT NULL | NOTICE |
|------|--------|----------|--------|
| id   | string | Y        |        |
| uuid | string | Y        |        |

### 获取用户信息

```sh
GET /users/{id}
```

Request Parameters

| KEY | TYPE   | NOT NULL | NOTICE |
|-----|--------|----------|--------|
| id  | string | Y        |        |

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
  uuid: 'ABCDEF',
}
```

### 更新用户信息

```sh
PUT /users/{id}
```

### 登录

```sh
POST /login
```

Request

```js
{
  auth_type: 1,
  auth_name: '34234',
  auth_code: '************',
}
```

Request Parameters

| KEY       | TYPE   | NOT NULL | NOTICE |
|-----------|--------|----------|--------|
| auth_type | int    | Y        |        |
| auth_name | string | Y        |        |
| auth_code |        |          |        |

Response

```js
{
  user_id: 'werew53243',
  verify_time: 1516602918,
  permission: 1,
  auth_type: 1,
  auth_name: '232132',
  token: '123213232434'
  token_expire: 1516602918,
}
```

Response Parameters

| KEY        | TYPE   | NOT NULL | NOTICE |
|------------|--------|----------|--------|
| user_id    | string | Y        |        |
| permission | int    | Y        |        |

### 登出

```sh
POST /logout
```

Request

```js
{
  token: 'sdfdsfsdfwerwerwe',
}
```

### 用户鉴权

- 此接口也可在网关服务中部署

```sh
POST /auths
```

Request

```js
{
  token: 'sdfdsfsdfwerwerwe',
}
```

Request Parameters

| KEY   | TYPE   | NOT NULL | NOTICE |
|-------|--------|----------|--------|
| token | string | Y        |        |

Response

```js
{
  user_id: 'werew53243',
  verify_time: 1516602918,
  permission: 1,
  auth_type: 1,
  auth_name: '232132',
  auth_expire: 1516602918,
  token: '123213232434'
  token_expire: 1516602918,
}
```

Response Parameters

| KEY        | TYPE   | NOT NULL | NOTICE |
|------------|--------|----------|--------|
| user_id    | string | Y        |        |
| permission | int    | Y        |        |

### 修改鉴权资料

```sh
POST /auths/{user_id}
```

Request

```js
{
  user_id: 'sdfdsfsdfwerwerwe',
  auth_code: '242343'.
  permission: 1,
}
```

Request Parameters

| KEY        | TYPE   | NOT NULL | NOTICE |
|------------|--------|----------|--------|
| user_id    | string | Y        |        |
| auth_code  | string |          |        |
| permission | int    |          |        |
