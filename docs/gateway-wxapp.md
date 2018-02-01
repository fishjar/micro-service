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
  encryptedData: 'wefsdf',
  iv: '',
}
```

Response

```js
{
  token: 'trt4tefere',
  token_expire: 1516602918,

  id: 'DEF123',
  uuid: 'ABCDEF',
  name: 'zhangsan',
  nickname: 'laozhang',
  mobile: '13888888888',
  email: 'zhangsan@test.com',
  gender: 1,
  birthday: 1516602918,
  avatar: '/media/img/123.png',
}
```

### 获取个人信息

```sh
GET /users/<id>
```

Response

```js
{
  id: 'DEF123',
  uuid: 'ABCDEF',
  name: 'zhangsan',
  nickname: 'laozhang',
  mobile: '13888888888',
  email: 'zhangsan@test.com',
  gender: 1,
  birthday: 1516602918,
  avatar: '/media/img/123.png',
}
```

### 登出

```sh
POST /logout
```
