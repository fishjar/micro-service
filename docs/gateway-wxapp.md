# 微服务-网关 小程序

- 网关服务，对接用户端与后台微服务
- 对高频数据缓存

## 数据库

### 登录认证表（缓存到redis）

```js
`auth:{token}`： {
  `user_id`,
  `auth_type`,
  `expire_time`,
  `verify_time`,
  `token_expire`,
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

## API

### 登录

```sh
POST /login
```

Request

```js
{
  appid: 'sdfdfdsfd',
  code: '123124234234',

  user_info: {}, // 小程序获取的基本信息
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
  uuid: 'ABCDEF',
}
```

### 登出

```sh
POST /logout
```
