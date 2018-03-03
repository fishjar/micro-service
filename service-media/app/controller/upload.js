'use strict';

const fs = require('mz/fs');
const path = require('path');
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const crypto = require('crypto');

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

    const stream = await this.ctx.getFileStream();
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    const hashname = crypto.createHash('md5').update(buf).digest('hex');
    const extname = path.extname(stream.filename).toLowerCase();
    const filename = hashname + extname;
    const filedir = path.join(config.baseDir, extname.slice(1), hashname.slice(0, 2), hashname.slice(2, 4));
    const target = path.join(filedir, filename);
    console.log('------------')
    console.log({filedir})
    console.log({target})
    const isDirExist = await fs.exists(filedir);
    if (!isDirExist) {
      // await fs.mkdir(filedir);
      await ctx.mkdirs(filedir);
    }
    const isFileExist = await fs.exists(target);
    if (!isFileExist) {
      await fs.writeFile(target, buf);
    }

    ctx.body = { url: '/public/' + filename };
  }

}

module.exports = UploadController;
