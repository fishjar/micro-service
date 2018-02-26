# 微服务-商品管理 `product`

## 介绍

- 商品主要分为服务类和实物类，服务类商品一般属于某种实物的抽象
- 单品可以由多个子单品组成，采用子ID方式
- 商品分类有层级，采用父ID方式

## 数据库

```sh
单品->商品->分类
单品->商品->品牌->供应商
属性->分类
属性<-属性值->商品
属性<-属性值->单品
单品->单品
```

### 分类表 `cat`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK    |
|-------------|--------------|---------|----------|-----------|---------|---------|-----------|
| id          | INT          |         | Y        | Y         | Y       |         |           |
| name        | VARCHAR(64)  |         |          |           |         |         |           |
| pid         | INT          |         |          |           |         |         | parent id |
| is_parent   | VARCHAR(1)   |         |          |           |         |         |           |
| sort        | INT          |         |          |           |         |         |           |
| description | VARCHAR(128) |         |          |           |         |         |           |

```js
is_parent: {
  'N': '非父类'
  'Y': '父类'
}
```

### 公司表 `corporation`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| name        | VARCHAR(64)  |         |          |           |         |         |        |
| corp_code   | VARCHAR(64)  |         |          |           |         |         |        |
| phone       | VARCHAR(16)  |         |          |           |         |         |        |
| mobile      | VARCHAR(16)  |         |          |           |         |         |        |
| fax         | VARCHAR(16)  |         |          |           |         |         |        |
| email       | VARCHAR(64)  |         |          |           |         |         |        |
| country     | VARCHAR(64)  |         |          |           |         |         |        |
| province    | VARCHAR(64)  |         |          |           |         |         |        |
| city        | VARCHAR(64)  |         |          |           |         |         |        |
| dist        | VARCHAR(64)  |         |          |           |         |         |        |
| road        | VARCHAR(64)  |         |          |           |         |         |        |
| addr        | VARCHAR(128) |         |          |           |         |         |        |
| latitude    | FLOAT        |         |          |           |         |         |        |
| longitude   | FLOAT        |         |          |           |         |         |        |
| description | VARCHAR(128) |         |          |           |         |         |        |

### 联系人表 `contact`

| KEY       | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-----------|--------------|---------|----------|-----------|---------|---------|--------|
| id        | INT          |         | Y        | Y         | Y       |         |        |
| user_id   | INT          |         |          |           |         |         |        |
| corp_id   | INT          |         |          |           |         |         |        |
| name      | VARCHAR(64)  |         |          |           |         |         |        |
| job       | VARCHAR(16)  |         |          |           |         |         |        |
| phone     | VARCHAR(16)  |         |          |           |         |         |        |
| mobile    | VARCHAR(16)  |         |          |           |         |         |        |
| country   | VARCHAR(64)  |         |          |           |         |         |        |
| province  | VARCHAR(64)  |         |          |           |         |         |        |
| city      | VARCHAR(64)  |         |          |           |         |         |        |
| dist      | VARCHAR(64)  |         |          |           |         |         |        |
| road      | VARCHAR(64)  |         |          |           |         |         |        |
| addr      | VARCHAR(128) |         |          |           |         |         |        |
| latitude  | FLOAT        |         |          |           |         |         |        |
| longitude | FLOAT        |         |          |           |         |         |        |

### 品牌表 `brand`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| corp_id     | INT          |         |          |           |         |         |        |
| cat_id      | INT          |         |          |           |         |         |        |
| name_en     | VARCHAR(64)  |         |          |           |         |         |        |
| name_cn     | VARCHAR(64)  |         |          |           |         |         |        |
| description | VARCHAR(255) |         |          |           |         |         |        |
| logo        | VARCHAR(255) |         |          |           |         |         |        |
| website     | VARCHAR(128) |         |          |           |         |         |        |
| story       | TEXT         |         |          |           |         |         |        |

### 商品表 `product`

| KEY            | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|----------------|-------------|---------|----------|-----------|---------|---------|--------|
| id             | INT         |         | Y        | Y         | Y       |         |        |
| brand_id       | INT         |         |          |           |         |         |        |
| cat_id         | INT         |         |          |           |         |         | 冗余字段   |
| manufacturer   | INT         |         |          |           |         |         |        |
| name           | VARCHAR(64) |         |          |           |         |         |        |
| price          | INT         |         |          |           |         |         |        |
| product_status | TINYINT     |         |          |           |         |         |        |
| unit           | VARCHAR(16) |         |          |           |         |         |        |

```js
product_status: {
  0: `正常`,
  1: `库存不足`,
  2: `下架`,
  4: `停产`,
}
```

### 单品表 `sku`

| KEY          | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|--------------|-------------|---------|----------|-----------|---------|---------|--------|
| id           | INT         |         | Y        | Y         | Y       |         |        |
| product_id   | INT         |         |          |           |         |         |        |
| name         | VARCHAR(64) |         |          |           |         |         |        |
| no           | VARCHAR(64) |         |          |           |         |         |        |
| price        | INT         |         |          |           |         |         |        |
| sku_status   | TINYINT     |         |          |           |         |         |        |
| extend       | TEXT        |         |          |           |         |         |        |
| product_code | VARCHAR(64) |         |          |           |         |         |        |
| bar_code     | VARCHAR(64) |         |          |           |         |         |        |
| is_pack      | VARCHAR(1)  |         |          |           |         |         |        |
| subs         | TEXT        |         |          |           |         |         |        |
| unit         | VARCHAR(16) |         |          |           |         |         | 冗余字段   |

```js
sku_status: {
  0: `正常`,
  1: `库存不足`,
  2: `下架`,
  4: `停产`,
}
is_pack: {
  'N': `非组合商品`,
  'Y': `组合商品`,
}
subs: [{
  sku_id: 232332,
  number: 1,
  price: 100,
}]
```

<!--
### 打包表 `pack`

| KEY        | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|------|---------|----------|-----------|---------|---------|--------|
| id         | INT  |         | Y        | Y         | Y       |         |        |
| name       |      |         |          |           |         |         |        |
| sku_code   |      |         |          |           |         |         |        |
| sku_status |      |         |          |           |         |         |        |
| extend     |      |         |          |           |         |         |        |

### 打包子项表 `packitem`

| KEY     | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|---------|------|---------|----------|-----------|---------|---------|--------|
| id      | INT  |         | Y        | Y         | Y       |         |        |
| pack_id |      |         |          |           |         |         |        |
| sku_id  |      |         |          |           |         |         |        |
| number  |      |         |          |           |         |         |        |
| price   |      |         |          |           |         |         |        |
| extend  |      |         |          |           |         |         |        |
-->

### 属性名表 `pron`

| KEY       | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-----------|-------------|---------|----------|-----------|---------|---------|--------|
| id        | INT         |         | Y        | Y         | Y       |         |        |
| cat_id    | INT         |         |          |           |         |         |        |
| pron_type | TINYINT     |         |          |           |         |         |        |
| is_sku    | VARCHAR(1)  |         |          |           |         |         |        |
| name      | VARCHAR(64) |         |          |           |         |         |        |
| sort      | INT         |         |          |           |         |         |        |

```js
pron_type: {
  1: `字符`,
  2: `整数`,
  3: `浮点数`,
  4: `布尔`,
  5: `图片`,
}
is_sku: {
  'P': `商品属性`,
  'S': `SKU属性`,
  'A': `均有属性`,
}
```

### 商品-属性表 `product_pron`

| KEY        | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|------------|--------------|---------|----------|-----------|---------|---------|--------|
| id         | INT          |         | Y        | Y         | Y       |         |        |
| pron_id    | INT          |         |          |           |         |         |        |
| product_id | INT          |         |          |           |         |         |        |
| is_sku     | VARCHAR(1)   |         |          |           |         |         |        |
| suk_id     | INT          |         |          |           |         |         |        |
| value      | VARCHAR(255) |         |          |           |         |         |        |
| image      | VARCHAR(255) |         |          |           |         |         |        |

```js
is_sku: {
  'P': `商品属性`,
  'S': `SKU属性`,
  'A': `均有属性`,
}
```

## API
