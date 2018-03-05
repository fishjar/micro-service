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

    const stream = await ctx.getFileStream();
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    // await sharp(buf)
    //   .resize(100, 100)
    //   .toFile('/home/gabe/tmp/egg/1/1/test.jpg', (err, info) => {
    //     console.log('-----------------')
    //     console.log({err})
    //     console.log({info})
    //     ctx.body = info;
    //   });
    // return;

    const hashname = crypto.createHash('md5').update(buf).digest('hex'); // "076e3caed758a1c18c91a0e9cae3368f"
    const extname = path.extname(stream.filename).toLowerCase(); // ".jpg"
    const rename = hashname + extname; // "076e3caed758a1c18c91a0e9cae3368f.jpg"
    const filepath = path.join(extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4), rename); // "jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
    const target = path.join(config.baseDir, filepath); // "/base/dir/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"
    const url = config.baseUrl + filepath; // "http://media.fishjar.com/jpg/07/6e/076e3caed758a1c18c91a0e9cae3368f.jpg"

    // 保存文件到服务器
    await ctx.createFile(target, buf);

    // 保存数据到数据库
    const { title, user_id, description } = stream.fields;
    let media_type = config.fileTypes.length;
    while (media_type > 0) {
      if (config.fileTypes[media_type - 1].includes(extname)) {
        break;
      }
      media_type--;
    }
    let data = await ctx.service.media.findOne({ hashname });
    if (!data) {
      data = await ctx.service.media.create({
        user_id,
        media_type,
        filename: stream.filename,
        title,
        hashname,
        ext: extname,
        path: filepath,
        url,
        description,
      });
    }

    ctx.body = {
      errcode: 0,
      errmsg: 'upload success!',
      data,
    }
  }

}

module.exports = UploadController;
