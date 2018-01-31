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

- [小程序](./gateway-wxapp.md)

## 微服务

- [用户系统](./service-user.md)
- [员工管理](./service-staff.md)
- [短信服务](./service-msg.md)
- [文件服务](./service-media.md)
- [日志服务](./service-log.md)
- [推广服务](./service-track.md)
- [微信服务](./service-wx.md)
- [商品管理](./service-product.md)
- [库存管理](./service-stock.md)
- [订单管理](./service-order.md)
- [定时任务]

## 数据库共有字段

| KEY        | TYPE      | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|-----------|---------|----------|-----------|---------|---------|--------|
| id         | INT       |         | Y        | Y         | Y       |         |        |
| created_at | TIMESTAMP |         | Y        |           |         |         |        |
| updated_at | TIMESTAMP |         | Y        |           |         |         |        |
| status     | TINYINT   | 0       | Y        |           |         |         |        |

```js
status: {
  0: `正常`,
  1: `锁定`,
  2: `删除`,
}
```

## 全局API说明

- 所有内部id均不对外暴露，网关API需要用到时，通过`hashids`加密
- 微服务内部调用还是直接使用id

### token传递方式

```js
headers: {
  authenticationtoken: 'sdfsdfsdf3434dfdf', // 身份认证
  authorizationtoken: 'sdf2323fds3', // 权限认证
}
```

### Request

```js
{
  page: 1,
  per_page: 10,
  data: [],
}
```

### Request Parameters

| KEY      | TYPE  | NOT NULL | REMARK |
|----------|-------|----------|--------|
| page     | int   |          | 页码     |
| per_page | int   |          | 每页数目   |
| data     | array |          | 批量信息   |

### Response

```js
{
  errcode: 0,
  errmsg: 'ok',
  page: 1,
  pages: 3,
  per_page: 10,
  total: 33,
  data: [],
}
{
  errcode: 0,
  errmsg: 'ok',
  data: {},
}
```

### Response Parameters

| KEY     | TYPE         | NOT NULL | REMARK    |
|---------|--------------|----------|-----------|
| errcode | int          | Y        | 0正常，其他值错误 |
| errmsg  | string       | Y        | 错误信息      |
| data    | object/array |          | 返回数据      |
| total   | int          |          | 总数目       |
