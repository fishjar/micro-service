'use strict';

const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

module.exports = {
  async createFile(target, buf) {
    if (await fs.exists(target)) {
      return;
    }
    await fs.ensureDir(path.dirname(target));
    return fs.writeFile(target, buf);
  },
  getMeta(buf) {
    return new Promise((resolve, reject) => {
      sharp(buf).metadata((err, metadata) => {
        if (err) {
          reject(err)
        } else {
          resolve(metadata);
        }
      })
    })
  },
  getResize(buf, width, height) {
    return new Promise((resolve, reject) => {
      sharp(buf)
        .resize(width, height) // 缩放
        .toBuffer()
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
  },
  getThumb(buf, thumb, width, height) {
    return new Promise((resolve, reject) => {
      let top = 0;
      let left = ~~((width - height) / 2);
      if (height > width) {
        left = 0;
        top = ~~((height - width) / 2);
      }
      const l = Math.min(width, height);
      const size = Math.min(thumb, l);
      sharp(buf)
        .extract({ left, top, width: l, height: l }) // 剪裁
        .resize(size, size) // 缩放
        .toBuffer()
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
  },

  foo(param) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    return param;
  },

};
