# 微服务设计文档

- 一个网关服务连接多个微服务，组合成一个完整的应用
- 单个微服务尽量不耦合，仅通过网关服务整合
- 使用频率高的数据，通过网关服务缓存到redis
- 微服务数据库根据实际情况，可以单独也可以公用

## 架构示意图

```sh
          -------         -------
         | 客户端 |       | 客户端 |
          -------         -------
               \           /
                \         /
                 -------
                | NginX |
                 -------
                    |
             -----------------             -------------
            | APP API Gateway | --------- | redis cache |
             -----------------             -------------
               /              \
              /                \
  -----------------          -----------------
 | micro service A |        | micro service B |
  -----------------          -----------------
         |                           |
        ----                        ----
       | DB |                      | DB |
        ----                        ----
```

## 微服务网关（应用）

- [小程序](./app-wxapp.md)

## 微服务

- [用户服务](./service-sso.md)
- [短信服务](./service-msg.md)
- [文件服务](./service-media.md)
- [日志服务](./service-log.md)
- [推广服务](./service-promo.md)
- [微信服务](./service-wx.md)
- [商品管理]
- [库存管理]
- [订单管理]
- [收支管理]
- [定时任务]

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

- 所有内部id均不对外暴露，网关API需要用到时，通过`hashids`加密
- 微服务内部调用还是直接使用id

### token传递方式

```js
headers: {
  authToken: 'sdfsdfsdfdfdf'
}
```

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
