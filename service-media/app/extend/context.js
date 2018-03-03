'use strict';

const fs = require('mz/fs');
const path = require('path');

module.exports = {
  async mkdirs(dirname) {
    console.log({ dirname })
    if (await fs.exists(dirname)) {
      // callback();
    } else {
      await this.mkdirs(path.dirname(dirname));
    }
    // await fs.exists(dirname, exists => {
    //   if (!exists) {
    //     await this.mkdirs(path.dirname(dirname), () => {
    //       await fstat.mkdir(dirname);
    //     })
    //   }
    // })

    // return fs.exists(dirname, function (exists) {
    //   if (exists) {
    //     callback();
    //   } else {
    //     //console.log(path.dirname(dirname));
    //     mkdirs(path.dirname(dirname), function () {
    //       fs.mkdir(dirname, callback);
    //     });
    //   }
    // });
  },
};
