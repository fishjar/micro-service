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

| KEY      | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|----------|--------------|---------|----------|-----------|---------|---------|--------|
| id       | INT          |         | Y        | Y         | Y       |         |        |
| user_id  | INT          |         | Y        |           |         | Y       |        |
| promcode | VARCHAR(64)  |         | Y        |           |         |         |        |
| wxbcode  | VARCHAR(128) |         |          |           |         |         |        |

### 推广码跟踪表 `track`

| KEY        | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|-------------|---------|----------|-----------|---------|---------|--------|
| id         | INT         |         | Y        | Y         | Y       |         |        |
| track_type | INT         |         | Y        |           |         |         |        |
| user_id    | INT         |         | Y        |           |         | Y       |        |
| promo_id   | INT         |         |          |           |         | Y       |        |

```js
track_type: {
  1: `访问`,
  2: `新用户`, // 其他类型根据需要随时添加
}
```

## API

### 获取推广码

- 没有则自动创建

```sh
GET /tracks/{user_id}/{track_type}
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
  referrer: 2323123,
}
```