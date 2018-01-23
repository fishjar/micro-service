# 微服务-日志系统 `promo`

## 介绍

- 用于用户推广跟踪记录

## 数据库

### 推广码表 `promo`

| KEY        | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|------------|-------------|---------|----------|-----------|---------|---------|--------|
| id         | BIGINT      |         | Y        | Y         | Y       |         |        |
| promo_type | INT         |         | Y        |           |         |         |        |
| user_id    | BIGINT      |         | Y        |           |         | Y       |        |
| referrer   | BIGINT      |         |          |           |         | Y       |        |
| promcode   | VARCHAR(64) |         | Y        |           |         |         |        |

```js
promo_type: {
  1: `注册`, // 其他类型根据需要随时添加
}
```

## API

### 获取推广码

- 没有则自动创建

```sh
GET /promos/{user_id}/{promo_type}
```

Response

```js
{
  id: 13213,
  promo_type: 1,
  user_id: 12323,
  referrer: 2342343,
  promcode: '2sdfsdasdwe',
}
```

### 添加推广记录

```sh
POST /promos
```

Request

```js
{
  user_id: 6432434,
  promo_type: 1,
  referrer: 2323123,
}
```