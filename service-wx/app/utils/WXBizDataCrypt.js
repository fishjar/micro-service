'use strict';

const crypto = require('crypto');

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function(encryptedData, iv) {
  // base64 decode
  const sessionKey = new Buffer(this.sessionKey, 'base64');
  encryptedData = new Buffer(encryptedData, 'base64');
  iv = new Buffer(iv, 'base64');
  let decoded = '';

  try {
    // 解密
    console.log('---------1------')
    console.log({key:this.sessionKey})
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    console.log('----------2-----')
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    console.log('----------3-----')
    decoded = decipher.update(encryptedData, 'binary', 'utf8');
    console.log('----------4-----')
    console.log({decoded})
    decoded += decipher.final('utf8');
    console.log('----------5-----')
    console.log({decoded})
    decoded = JSON.parse(decoded);

  } catch (err) {
    throw new Error('Illegal Buffer');
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer');
  }

  return decoded;
};

module.exports = WXBizDataCrypt;
