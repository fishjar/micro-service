# 微服务-商品管理 `product`

## 介绍

- 商品主要分为服务类和实物类，服务类商品一般属于某种实物的抽象
- 单品可以由多个子单品组成，采用子ID方式
- 商品分类有层级，采用父ID方式

## 数据库

```sh
单品->商品->品牌->分类
属性->分类
属性<-属性值->商品
属性<-属性值->单品
单品->单品
```

### 分类表 `cat`

| KEY       | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----------|-------------|---------|----------|-----------|---------|---------|--------|
| id        | INT         |         | Y        | Y         | Y       |         |        |
| name      | VARCHAR(64) |         |          |           |         |         |        |
| pid       | INT         |         |          |           |         |         |        |
| is_parent | TINYINT     |         |          |           |         |         |        |
| sort      | INT         |         |          |           |         |         |        |

```js
is_parent: {
  0: '非父类'
  1: '父类'
}
```

### 品牌表 `brand`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| cat_id      | INT          |         |          |           |         |         |        |
| name_en     | VARCHAR(64)  |         |          |           |         |         |        |
| name_cn     | VARCHAR(64)  |         |          |           |         |         |        |
| description | VARCHAR(128) |         |          |           |         |         |        |
| logo        | VARCHAR(128) |         |          |           |         |         |        |
| website     | VARCHAR(128) |         |          |           |         |         |        |
| story       | TEXT         |         |          |           |         |         |        |

### 商品表 `product`

| KEY            | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|----------------|-------------|---------|----------|-----------|---------|---------|--------|
| id             | INT         |         | Y        | Y         | Y       |         |        |
| brand_id       | INT         |         |          |           |         |         |        |
| name           | VARCHAR(64) |         |          |           |         |         |        |
| price          | INT         |         |          |           |         |         |        |
| product_status | TINYINT     |         |          |           |         |         |        |

```js
product_status: {
  0: `正常`,
  1: `库存不足`,
  2: `下架`,
  4: `停产`,
}
```

### 单品表 `sku`

| KEY          | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|--------------|-------------|---------|----------|-----------|---------|---------|--------|
| id           | INT         |         | Y        | Y         | Y       |         |        |
| product_id   | INT         |         |          |           |         |         |        |
| name         | VARCHAR(64) |         |          |           |         |         |        |
| number       | INT         |         |          |           |         |         |        |
| price        | INT         |         |          |           |         |         |        |
| sku_code     | VARCHAR(64) |         |          |           |         |         |        |
| sku_status   | TINYINT     |         |          |           |         |         |        |
| extend       | TEXT        |         |          |           |         |         |        |
| product_code | VARCHAR(64) |         |          |           |         |         |        |
| bar_code     | VARCHAR(64) |         |          |           |         |         |        |
| is_pack      | TINYINT     |         |          |           |         |         |        |
| subs         | TEXT        |         |          |           |         |         |        |

```js
sku_status: {
  0: `正常`,
  1: `库存不足`,
  2: `下架`,
  4: `停产`,
}
is_pack: {
  0: `非组合商品`,
  1: `组合商品`,
}
subs: [{
  sku_id: 232332,
  number: 1,
  price: 100,
}]
```

<!--
### 打包表 `pack`

| KEY        | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|------------|------|---------|----------|-----------|---------|---------|--------|
| id         | INT  |         | Y        | Y         | Y       |         |        |
| name       |      |         |          |           |         |         |        |
| sku_code   |      |         |          |           |         |         |        |
| sku_status |      |         |          |           |         |         |        |
| extend     |      |         |          |           |         |         |        |

### 打包子项表 `packitem`

| KEY     | TYPE | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|---------|------|---------|----------|-----------|---------|---------|--------|
| id      | INT  |         | Y        | Y         | Y       |         |        |
| pack_id |      |         |          |           |         |         |        |
| sku_id  |      |         |          |           |         |         |        |
| number  |      |         |          |           |         |         |        |
| price   |      |         |          |           |         |         |        |
| extend  |      |         |          |           |         |         |        |
-->

### 属性名表 `pron`

| KEY       | TYPE        | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|-----------|-------------|---------|----------|-----------|---------|---------|--------|
| id        | INT         |         | Y        | Y         | Y       |         |        |
| cat_id    | INT         |         |          |           |         |         |        |
| pron_type | TINYINT     |         |          |           |         |         |        |
| is_sku    | TINYINT     |         |          |           |         |         |        |
| name      | VARCHAR(64) |         |          |           |         |         |        |
| sort      | INT         |         |          |           |         |         |        |

```js
pron_type: {
  0: `字符`,
  1: `数值`,
  2: `布尔`,
  4: `图片`,
}
is_sku: {
  0: `商品商品`,
  1: `SKU属性`,
  2: `均有属性`,
}
```

### 商品-属性表 `product_pron`

| KEY        | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | NOTICE |
|------------|--------------|---------|----------|-----------|---------|---------|--------|
| id         | INT          |         | Y        | Y         | Y       |         |        |
| pron_id    | INT          |         |          |           |         |         |        |
| product_id | INT          |         |          |           |         |         |        |
| is_suk     | TINYINT      |         |          |           |         |         |        |
| suk_id     | INT          |         |          |           |         |         |        |
| value      | VARCHAR(128) |         |          |           |         |         |        |
| image      | VARCHAR(128) |         |          |           |         |         |        |

```js
is_sku: {
  0: `商品商品`,
  1: `SKU属性`,
}
```

## API
