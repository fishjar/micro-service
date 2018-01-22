# 微服务-用户系统 `SSO`

## 介绍

- 用户鉴权服务
- 实现多种注册及登录方式
  - 帐号/手机/邮箱+密码
  - 手机+动态密码
  - 微信/Twitter/Gmail等OAuth认证
- 利用手机/邮箱识别同人不同端
  - 发现同一个人时，合并用户资料表，并指向先认证的那条记录，还需修改相关业务记录的user_id
  - 修改密码/手机/邮箱资料需要全部更新
- 优化帐号安全及登录效率

## 数据库

### 用户身份表 `auth`

| KEY           | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|---------------|--------------|---------|----------|-----------|---------|---------|--------|
| id            | BIGINT       |         | Y        | Y         | Y       |         |        |
| user_id       | BIGINT       |         | Y        |           |         | Y       |        |
| identity_type | TINYINT      |         | Y        |           |         |         |        |
| identifier    | VARCHAR(64)  |         | Y        |           |         |         |        |
| certificate   | VARCHAR(128) |         |          |           |         |         |        |
| expires       | TIMESTAMP    |         |          |           |         |         |        |
| verify_time   | TIMESTAMP    |         | Y        |           |         |         |        |
| token         | VARCHAR(128) |         |          |           |         |         |        |

```js
`identity_type`: {
  1:`username`,
  2:`mobile`,
  3:`email`,
  4:`wx`,
}
```

### 用户资料表 `user`

| KEY       | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----------|--------------|---------|----------|-----------|---------|---------|--------|
| id        | BIGINT       |         | Y        | Y         | Y       |         |        |
| uuid      | VARCHAR(32)  |         | Y        |           |         |         |        |
| name      | VARCHAR(64)  |         |          |           |         |         |        |
| nickname  | VARCHAR(64)  |         |          |           |         |         |        |
| mobile    | CHAR(16)     |         |          |           |         |         |        |
| email     | VARCHAR(64)  |         |          |           |         |         |        |
| gender    | TINYINT      |         |          |           |         |         |        |
| birthday  | TIMESTAMP    |         |          |           |         |         |        |
| avatar    | VARCHAR(128) |         |          |           |         |         |        |
| referrer  | BIGINT       |         |          |           |         | Y       |        |
| promocode | VARCHAR(64)  |         | Y        |           |         |         |        |

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
  name: 'zhangsan',
  nickname: 'laozhang',
  mobile: '13888888888',
  email: 'zhangsan@test.com',
  gender: 1,
  birthday: 1516602918,
  avatar: '/media/img/123.png',
  promocode: 'ABCDE',
}
```

Request Parameters

| KEY       | TYPE   | NOT NULL | NOTICE    |
|-----------|--------|----------|-----------|
| name      | string |          |           |
| nickname  | string |          |           |
| mobile    | string |          |           |
| email     | string |          |           |
| gender    | int    |          | 0未知/1男/2女 |
| birthday  | int    |          | 时间戳       |
| avatar    | string |          |           |
| promocode | string |          | 推荐码       |

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
  // uuid: 'ABCDEF',
  // referrer: 'ABC',
  promocode: 'DEF',
}
```

Response Parameters

| KEY       | TYPE   | NOT NULL | NOTICE |
|-----------|--------|----------|--------|
| id        | string | Y        |        |
| promocode | string | Y        | 推广码    |

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
  // uuid: 'ABCDEF',
  // referrer: 'ABC',
  promocode: 'DEF',
}
```

Response Parameters

| KEY       | TYPE   | NOT NULL | NOTICE          |
|-----------|--------|----------|-----------------|
| id        | string | Y        | 利用hashids加密后的ID |
| promocode | string | Y        | 推广码             |
