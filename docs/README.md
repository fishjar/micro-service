# 微服务设计文档

## 架构示意图

```sh
       -------              -------
      | 客户端 |            | 客户端 |
       -------              -------
            \                 /
             \               /
             -----------------             ------------
            | APP API Gateway | --------- | redis cach |
             -----------------             ------------
               /              \
              /                \
  -----------------              -----------------
 | micro service A |            | micro service B |
  -----------------              -----------------
         |                               |
        ----                            ----
       | DB |                          | DB |
        ----                            ----
```
## 应用列表

- [小程序](./app-wxapp.md)

## 服务列表

- [用户及登录服务](./service-sso.md)
- [短信服务](./service-msg.md)
- [文件服务](./service-media.md)
- [日志服务](./service-log.md)
- [推广服务](./service-promo.md)

## 数据库共有字段

| KEY         | TYPE      | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-------------|-----------|---------|----------|-----------|---------|---------|--------|
| id          | BIGINT    |         | Y        | Y         | Y       |         |        |
| create_time | TIMESTAMP |         | Y        |           |         |         |        |
| update_time | TIMESTAMP |         | Y        |           |         |         |        |
| status      | TINYINT   |         | Y        |           |         |         |        |

```js
status: {
  1: `正常`,
  2: `锁定`,
  3: `删除`,
}
```

## 全局API说明

### Request

```js
{
  page: 1,
  size: 10,
  list: [],
}
```

### Request Parameters

| KEY  | TYPE  | NOT NULL | NOTICE |
|------|-------|----------|--------|
| page | int   |          | 页码     |
| size | int   |          | 每页数目   |
| list | array |          | 批量信息   |

### Response

```js
{
  errcode: 0,
  errmsg: 'ok',
  list: [],
  count: 2
}
```

### Response Parameters

| KEY     | TYPE   | NOT NULL | NOTICE    |
|---------|--------|----------|-----------|
| errcode | int    | Y        | 0正常，其他值错误 |
| errmsg  | string | Y        | 错误信息      |
| list    | array  |          | 列表信息      |
| count   | int    |          | 总数目       |
