# 微服务-微信 `wx`

## 介绍

- 管理微信公众号，企业号，小程序等
- 与微信对接的服务
  - 实现维护令牌
  - 通过code获取微信个人资料

## 数据库

### 微信公众号，企业号，小程序表 `wxapp`

| Field        | Type         | Null | Key | Default | Extra          |
|--------------|--------------|------|-----|---------|----------------|
| id           | int(11)      | NO   | PRI | NULL    | auto_increment |
| app_type     | int(11)      | YES  |     | NULL    |                |
| wxmch_id     | int(11)      | YES  |     | NULL    |                |
| name         | varchar(32)  | YES  |     | NULL    |                |
| appid        | varchar(32)  | YES  |     | NULL    |                |
| secret       | varchar(64)  | YES  |     | NULL    |                |
| access_token | varchar(512) | YES  |     | NULL    |                |
| expires_in   | datetime     | YES  |     | NULL    |                |

```js
app_type: {
  1: `公众号`,
  2: `企业号`,
  3: `小程序`,
}
```

### 微信商户号表 `wxmch`

| Field  | Type         | Null | Key | Default | Extra          |
|--------|--------------|------|-----|---------|----------------|
| id     | int(11)      | NO   | PRI | NULL    | auto_increment |
| name   | VARCHAR(64)  |      |     |         |                |
| mchid  | VARCHAR(32)  |      |     |         |                |
| secret | VARCHAR(128) |      |     |         |                |

### 微信用户表 `wxuser`

| Field       | Type         | Null | Key | Default | Extra          |
|-------------|--------------|------|-----|---------|----------------|
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| appid       | varchar(32)  | YES  |     | NULL    |                |
| unionid     | varchar(32)  | YES  |     | NULL    |                |
| openid      | varchar(32)  | YES  |     | NULL    |                |
| session_key | varchar(64)  | YES  |     | NULL    |                |
| nickname    | varchar(64)  | YES  |     | NULL    |                |
| avatar      | varchar(255) | YES  |     | NULL    |                |
| gender      | int(11)      | YES  |     | NULL    |                |
| city        | varchar(32)  | YES  |     | NULL    |                |
| province    | varchar(32)  | YES  |     | NULL    |                |
| country     | varchar(32)  | YES  |     | NULL    |                |

### 微信支付表 `wxpay`

| Field                | Type         | Null | Key | Default | Extra          |
|----------------------|--------------|------|-----|---------|----------------|
| id                   | int(11)      | NO   | PRI | NULL    | auto_increment |
| appid                | VARCHAR(32)  |      |     |         |                |
| mch_id               | VARCHAR(32)  |      |     |         |                |
| device_info          | VARCHAR(32)  |      |     |         |                |
| body                 | VARCHAR(128) |      |     |         |                |
| detail               | TEXT(6000)   |      |     |         |                |
| attach               | VARCHAR(128) |      |     |         |                |
| out_trade_no         | VARCHAR(32)  |      |     |         |                |
| fee_type             | VARCHAR(16)  |      |     |         |                |
| total_fee            | INT          |      |     |         |                |
| spbill_create_ip     | VARCHAR(16)  |      |     |         |                |
| time_start           | VARCHAR(14)  |      |     |         |                |
| time_expire          | VARCHAR(14)  |      |     |         |                |
| goods_tag            | VARCHAR(32)  |      |     |         |                |
| trade_type           | VARCHAR(128) |      |     |         |                |
| product_id           | VARCHAR(32)  |      |     |         |                |
| limit_pay            | VARCHAR(32)  |      |     |         |                |
| openid               | VARCHAR(128) |      |     |         |                |
| prepay_id            | VARCHAR(64)  |      |     |         |                |
| code_url             | VARCHAR(64)  |      |     |         |                |
| is_subscribe         | VARCHAR(1)   |      |     |         |                |
| trade_state          | VARCHAR(32)  |      |     |         |                |
| bank_type            | VARCHAR(16)  |      |     |         |                |
| settlement_total_fee | INT          |      |     |         |                |
| cash_fee             | INT          |      |     |         |                |
| cash_fee_type        | VARCHAR(16)  |      |     |         |                |
| coupon_fee           | INT          |      |     |         |                |
| coupon_count         | INT          |      |     |         |                |
| transaction_id       | VARCHAR(32)  |      |     |         |                |
| time_end             | VARCHAR(14)  |      |     |         |                |
| trade_state_desc     | VARCHAR(255) |      |     |         |                |

#### 微信预支付表 `wxpaypre` (作废)

| Field            | Type         | Null | Key | Default | Extra          |
|------------------|--------------|------|-----|---------|----------------|
| id               | int(11)      | NO   | PRI | NULL    | auto_increment |
| appid            | VARCHAR(32)  |      |     |         |                |
| mch_id           | VARCHAR(32)  |      |     |         |                |
| device_info      | VARCHAR(32)  |      |     |         |                |
| nonce_str        | VARCHAR(32)  |      |     |         |                |
| sign             | VARCHAR(32)  |      |     |         |                |
| sign_type        | VARCHAR(32)  |      |     |         |                |
| body             | VARCHAR(128) |      |     |         |                |
| detail           | TEXT(6000)   |      |     |         |                |
| attach           | VARCHAR(128) |      |     |         |                |
| out_trade_no     | VARCHAR(32)  |      |     |         |                |
| fee_type         | VARCHAR(16)  |      |     |         |                |
| total_fee        | INT          |      |     |         |                |
| spbill_create_ip | VARCHAR(16)  |      |     |         |                |
| time_start       | VARCHAR(14)  |      |     |         |                |
| time_expire      | VARCHAR(14)  |      |     |         |                |
| goods_tag        | VARCHAR(32)  |      |     |         |                |
| notify_url       | VARCHAR(128) |      |     |         |                |
| trade_type       | VARCHAR(128) |      |     |         |                |
| product_id       | VARCHAR(32)  |      |     |         |                |
| limit_pay        | VARCHAR(32)  |      |     |         |                |
| openid           | VARCHAR(128) |      |     |         |                |
| return_code      | VARCHAR(16)  |      |     |         |                |
| return_msg       | VARCHAR(128) |      |     |         |                |
| result_code      | VARCHAR(16)  |      |     |         |                |
| err_code         | VARCHAR(128) |      |     |         |                |
| err_code_des     | VARCHAR(128) |      |     |         |                |
| prepay_id        | VARCHAR(64)  |      |     |         |                |
| code_url         | VARCHAR(64)  |      |     |         |                |

#### 微信支付结果表 `wxpayaction` (作废)

| Field                | Type         | Null | Key | Default | Extra          |
|----------------------|--------------|------|-----|---------|----------------|
| id                   | int(11)      | NO   | PRI | NULL    | auto_increment |
| return_code          | VARCHAR(16)  |      |     |         |                |
| return_msg           | VARCHAR(128) |      |     |         |                |
| appid                | VARCHAR(32)  |      |     |         |                |
| mch_id               | VARCHAR(32)  |      |     |         |                |
| device_info          | VARCHAR(32)  |      |     |         |                |
| nonce_str            | VARCHAR(32)  |      |     |         |                |
| sign                 | VARCHAR(32)  |      |     |         |                |
| sign_type            | VARCHAR(32)  |      |     |         |                |
| result_code          | VARCHAR(16)  |      |     |         |                |
| err_code             | VARCHAR(32)  |      |     |         |                |
| err_code_des         | VARCHAR(128) |      |     |         |                |
| openid               | VARCHAR(128) |      |     |         |                |
| is_subscribe         | VARCHAR(1)   |      |     |         |                |
| trade_type           | VARCHAR(16)  |      |     |         |                |
| bank_type            | VARCHAR(16)  |      |     |         |                |
| total_fee            | INT          |      |     |         |                |
| settlement_total_fee | INT          |      |     |         |                |
| fee_type             | VARCHAR(8)   |      |     |         |                |
| cash_fee             | INT          |      |     |         |                |
| cash_fee_type        | VARCHAR(16)  |      |     |         |                |
| coupon_fee           | INT          |      |     |         |                |
| coupon_count         | INT          |      |     |         |                |
| transaction_id       | VARCHAR(32)  |      |     |         |                |
| out_trade_no         | VARCHAR(32)  |      |     |         |                |
| attach               | VARCHAR(128) |      |     |         |                |
| time_end             | VARCHAR(14)  |      |     |         |                |
| trade_state          | VARCHAR(32)  |      |     |         |                |
| trade_state_desc     | VARCHAR(255) |      |     |         |                |

## API

### 添加公众号

```sh
POST /wxapps
```

Request

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',
}
```

Request Parameters

| KEY      | TYPE   | NOT NULL | REMARK |
|----------|--------|----------|--------|
| app_type | int    | Y        |        |
| name     | string | Y        |        |
| appid    | string | Y        |        |
| secret   | string |          |        |

Response

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',

  id: `1323`,
}
```

### 获取公众号

```sh
GET /wxapps/{wxapp_id}
```

Request Parameters

| KEY      | TYPE | NOT NULL | REMARK |
|----------|------|----------|--------|
| wxapp_id | int  | Y        |        |

Response

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',
  id: `1323`,
}
```

### 修改公众号

```sh
PUT /wxapps/{wxapp_id}
```

Request

```js
{
  app_type: 1,
  name: '公众号A',
  appid: '3werwerewr',
  secret: '**********',
}
```

### 添加微信用户资料

```sh
POST /wxusers
```

Request

```js
{
  appid: 'wewrwrwere',
  unionid: '234234',
  openid: '3werwerewr',
  session_key: '**********',
  name: '',
  avatar: '',
  gender: 1,
  nickname: '',
  city: '',
  province: '',
  country: '',
}
```

### 获取微信用户资料

```sh
GET /wxusers/{appid}/{openid/unionid}
```

Request

```js
{
  appid: '23e2wee',
  unionid: '234234',
  openid: '3werwerewr',
}
```

Response

```js
{
  id: 12,
  appid: 'wewrwrwere',
  unionid: '234234',
  openid: '3werwerewr',
  session_key: '**********',
  name: '',
  avatar: '',
  gender: 1,
  nickname: '',
  city: '',
  province: '',
  country: '',
}
```

### 修改微信用户资料

```sh
PATCH /wxusers/{appid}/{openid/unionid}
```

### 微信登录，更新 `session_key`

```sh
POST /login
```

Request

```js
{
  appid: 'sdfdfdsfd',
  js_code,
}
```

Response

```js
{
  id: 'DEF123',
  unionid: 'sdfdfdfdsdfd',
  openid: 'sdfsdfdsfd',
}
```

### 解密并更新用户资料

```sh
POST /wxuser
```

Request

```js
{
  wxuser_id: 123,
  encryptedData,
  iv,
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
  unionid: 'sdfdfdfdsdfd',
  openid: 'sdfsdfdsfd',
}
```

### 添加微信商户号

```sh
POST /wxmchs
```

### 获取微信商户号

```sh
GET /wxmchs/{wxmch_id}
```
