# 微服务-推广与跟踪系统 `track`

## 介绍

- 用于用户推广跟踪记录

## 数据库

<!-- ### 推广码表 `track`

| KEY        | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |     |
|------------|-------------|---------|----------|-----------|---------|---------|--------|-----|
| id         | INT         |         | Y        | Y         | Y       |         |        |     |
| track_type | INT         |         | Y        |           |         |         |        |     |
| user_id    | INT         |         | Y        |           |         | Y       |        |     |
| referrer   | INT         |         |          |           |         | Y       |        |     |
| promcode   | VARCHAR(64) |         | Y        |           |         |         |        | --> |

### 推广码表 `promo`

| KEY        | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK         |
|------------|--------------|---------|----------|-----------|---------|---------|----------------|
| id         | INT          |         | Y        | Y         | Y       |         |                |
| user_id    | INT          |         | Y        |           |         | Y       |                |
| promo_type | INT          | 1       | Y        |           |         |         |                |
| promocode  | VARCHAR(64)  |         | Y        |           |         |         | 全表唯一，考虑hashids |
| wxbcode    | VARCHAR(255) |         |          |           |         |         |                |
| path       | VARCHAR(255) |         |          |           |         |         |                |

```js
promo_type: {
  1: `全局推广`, // 默认
}
```

### 推广码跟踪表 `track`

| KEY        | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|--------------|---------|----------|-----------|---------|---------|--------|
| id         | INT          |         | Y        | Y         | Y       |         |        |
| track_type | INT          |         | Y        |           |         |         |        |
| referrer   | INT          |         | Y        |           |         |         |        |
| detail     | VARCHAR(128) |         |          |           |         |         |        |
| user_id    | INT          |         | Y        |           |         | Y       | 上报用户   |
| promocode  | VARCHAR(64)  |         | Y        |           |         |         | 来源推广码  |

```js
track_type: {
  1: `新用户访问`,
  2: `老用户访问`,
}
referrer {
  1: '来自转发',
  2: '来自扫码',
}
```

### 转发表 `share`

| KEY        | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|--------------|---------|----------|-----------|---------|---------|--------|
| id         | INT          |         | Y        | Y         | Y       |         |        |
| share_type | INT          |         |          |           |         |         |        |
| path       | VARCHAR(255) |         |          |           |         |         |        |
| user_id    | INT          |         |          |           |         | Y       |        |
| promocode  | VARCHAR(64)  |         |          |           |         |         |        |

```js
share_type {
  1: 'menu',
  2: 'button',
}
```

## API

### 获取推广码

- 没有则自动创建

```sh
GET /tracks/{user_id}/{promo_type}
```

Response

```js
{
  id: 13213,
  track_type: 1,
  user_id: 12323,
  referrer: 2342343,
  promcode: '2sdfsdasdwe',
}
```

### 添加推广记录

```sh
POST /tracks
```

Request

```js
{
  user_id: 6432434,
  track_type: 1,
  referrer: 1,
  user_id,
  promocode,
}
```