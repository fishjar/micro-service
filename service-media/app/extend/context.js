'use strict';

// const fs = require('mz/fs');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  async createFile(target, buf) {
    if (await fs.exists(target)) {
      return;
    }
    await fs.ensureDir(path.dirname(target));
    return fs.writeFile(target, buf);
  },
};
