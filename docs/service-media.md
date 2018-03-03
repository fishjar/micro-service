# 微服务-文件系统 `file`

## 介绍

- 用于文件的上传下载
- 图片实现自动压缩剪裁
  - 压缩图及原图均保存一份
  - 根据需要剪裁等比例或方形图

## 数据库

### 文件表 `media`

| KEY         | TYPE         | DEFAULT | NOT NULL | INCREMENT | PRIMARY | FOREIGN | REMARK |
|-------------|--------------|---------|----------|-----------|---------|---------|--------|
| id          | INT          |         | Y        | Y         | Y       |         |        |
| user_id     | INT          |         |          |           |         | Y       |        |
| media_type  | TINYINT      |         | Y        |           |         |         |        |
| title       | VARCHAR(64)  |         |          |           |         |         |        |
| name        | VARCHAR(64)  |         | Y        |           |         |         |        |
| ext         | CHAR(4)      |         | Y        |           |         |         |        |
| path        | VARCHAR(128) |         | Y        |           |         |         |        |
| description | VARCHAR(128) |         |          |           |         |         |        |
| size        | INT          |         | Y        |           |         |         |        |
| width       | INT          |         |          |           |         |         |        |
| height      | INT          |         |          |           |         |         |        |

```js
media_type: {
  0: `未知`,
  1: `images`,
  2: `text`
  3: `tar`,
  4: `video`,
}
const whitelist = [
  // images
  '.jpg', '.jpeg', // image/jpeg
  '.png', // image/png, image/x-png
  '.gif', // image/gif
  '.bmp', // image/bmp
  '.wbmp', // image/vnd.wap.wbmp
  '.webp',
  '.tif',
  '.psd',
  // text
  '.svg',
  '.js', '.jsx',
  '.json',
  '.css', '.less',
  '.html', '.htm',
  '.xml',
  // tar
  '.zip',
  '.gz', '.tgz', '.gzip',
  // video
  '.mp3',
  '.mp4',
  '.avi',
];
```

## API

### 上传文件

```sh
POST /medias
```

Request

```js
{
  size: 64, // 剪裁边长
  sharp: 1, // 1等比例，2方形
}
```

Response

```js
{
  id: 13213,
  media_type: 1,
  title: '343434'
  name: 'fwer23434fsdfew', // hash加密
  ext: 'png',
  path: '/media/img/abc/def.png',
  description: '',
  size: 123, //单位K
}
```

### 获取文件信息

```sh
GET /medias/{media_id}
GET /medias_bynanme/{name}
```

Request

```js
{
  size: 64, // 剪裁边长
  sharp: 1, // 1等比例，2方形
}
```
