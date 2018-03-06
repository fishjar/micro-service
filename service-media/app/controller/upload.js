'use strict';

// const fs = require('mz/fs');
const fs = require('fs-extra');
const path = require('path');
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const crypto = require('crypto');
const sharp = require('sharp');

class UploadController extends Controller {

  // async ajax() {
  //   const { ctx, config } = this;
  //   const stream = await ctx.getFileStream();
  //   const extname = path.extname(stream.filename).toLowerCase();
  //   const filename = encodeURIComponent(stream.fields.name) + extname;
  //   const target = path.join(config.baseDir, 'test', filename);
  //   const writeStream = fs.createWriteStream(target);
  //   try {
  //     await awaitWriteStream(stream.pipe(writeStream));
  //   } catch (err) {
  //     await sendToWormhole(stream);
  //     throw err;
  //   }
  //   ctx.body = { url: '/public/' + filename };
  // }
  async ajax() {
    const { ctx, config } = this;
    const data = {};

    const stream = await ctx.getFileStream();
    // console.log('-----------------')
    // console.log({ stream })

    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    const hashname = crypto.createHash('md5').update(buf).digest('hex'); // "076e3caed758a1c18c91a0e9cae3368f"
    // 获取文件及组装信息
    const size = buf.length;
    const extname = path.extname(stream.filename).toLowerCase(); // ".jpg"
    const rename = hashname + extname; // "076e3caed758a1c18c91a0e9cae3368f.jpg"
    const filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), rename); // "jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
    const target = path.join(config.baseDir, filepath); // "/base/dir/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
    const url = config.baseUrl + filepath; // "http://media.fishjar.com/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"

    // 保存文件到服务器，已存在会直接返回
    await ctx.helper.createFile(target, buf);

    // 判断文件类型
    let media_type = config.fileTypes.length;
    while (media_type > 0) {
      if (config.fileTypes[media_type - 1].includes(extname)) {
        break;
      }
      media_type--;
    }

    // 如果是图片，获取图片尺寸
    let width, height;
    if (media_type === 1) {
      const metadata = await ctx.helper.getMeta(buf);
      width = metadata.width;
      height = metadata.height;

      const { resize, thumb } = stream.fields;
      // 缩放图片
      if (resize && resize > 0) {
        let rW = Math.min(resize, width);
        let rH = rW * height / width;
        if (height > width) {
          rH = Math.min(size, height);
          rW = rW * width / height;
        }
        const resize_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_' + Math.max(rW, rH) + extname);
        const resize_target = path.join(config.baseDir, resize_filepath);
        const resize_url = config.baseUrl + resize_filepath;
        if (! (await fs.exists(resize_target))) {
          const resize_buf = await ctx.helper.getResize(buf, rW, rH);
          await ctx.helper.createFile(resize_target, resize_buf);
        }
        Object.assign(data, { resize_url });
      }
      // 剪裁正方形缩略图
      if (thumb && thumb > 0) {
        const rW = Math.min(thumb, width, height);
        const thumb_filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), hashname + '_s' + rW + extname);
        const thumb_target = path.join(config.baseDir, thumb_filepath);
        const thumb_url = config.baseUrl + thumb_filepath;
        if (! (await fs.exists(thumb_target))) {
          const thumb_buf = await ctx.helper.getThumb(buf, thumb, width, height);
          await ctx.helper.createFile(thumb_target, thumb_buf);
        }
        Object.assign(data, { thumb_url });
      }
    }

    // 查找是否存在文件信息
    let media = await ctx.service.media.findOne({ hashname });

    if (!media) {
      // 获取用户提交参数
      const { title, user_id, description } = stream.fields;

      // 保存文件信息到数据库
      media = await ctx.service.media.create({
        user_id,
        media_type,
        filename: stream.filename,
        title,
        hashname,
        ext: extname,
        path: filepath,
        url,
        description,
        size,
        width,
        height,
      });
    }

    Object.assign(data, media.dataValues)
    ctx.body = {
      errcode: 0,
      errmsg: 'upload success!',
      data,
    }
  }

}

module.exports = UploadController;
