# 微服务-网关 小程序

- 网关服务，对接用户端与后台微服务
- 对高频数据缓存

## 数据库

### 鉴权表（缓存到redis）

```js
`auth:{token}`： {
  `user_id`,
  `auth_type`,
  `auth_name`,
  `auth_expire`,
  `permission`,
  `token_expire`,
  `verify_time`,
}
```

## API

### 注册

```sh
POST /register
```

### 登录

```sh
POST /login
```

### 登出

```sh
POST /logout
```

### 上传文件

```sh
POST /upload
```
