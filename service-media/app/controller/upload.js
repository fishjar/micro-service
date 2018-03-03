'use strict';

const fs = require('mz/fs');
const path = require('path');
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {

  // async ajax() {
  //   const { ctx, config } = this;
  //   const stream = await ctx.getFileStream();
  //   const extname = path.extname(stream.filename).toLowerCase();
  //   const filename = encodeURIComponent(stream.fields.name) + extname;
  //   const target = path.join(config.baseDir, 'test', filename);
  //   const writeStream = fs.createWriteStream(target);
  //   console.log('------------------')
  //   console.log({stream})
  //   console.log(stream.FileStream)
  //   console.log(stream.FileStream.buffer)
  //   try {
  //     await awaitWriteStream(stream.pipe(writeStream));
  //   } catch (err) {
  //     await sendToWormhole(stream);
  //     throw err;
  //   }

  //   ctx.body = { url: '/public/' + filename };
  // }
  async ajax() {
    const stream = await this.ctx.getFileStream();
    let buf;
    
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'test', filename);
    await fs.writeFile(target, buf);

    this.ctx.redirect('/public/' + filename);
  }

}

module.exports = UploadController;
