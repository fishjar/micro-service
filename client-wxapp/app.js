//app.js
const { promise, request } = require('./utils/util')
const { appid } = require('./utils/config')
App({
  onLaunch: function () {
    // 登录
    const { token, token_expire, user } = wx.getStorageSync('auth') || {}
    const now = Date.now() / 1000
    if (token && token_expire > now) {
      this.globalData.auth = { token, token_expire }
      this.globalData.user = user
    } else {
      this.login().then(res => {
        this.globalData.auth = { token: res.token, token_expire: res.token_expire }
        this.globalData.user = res.user
        wx.setStorageSync('auth', res)
        this.userReady && this.userReady(res.user)
      }).catch(err => console.log(err))
    }
  },
  login: function () {
    let code = '';
    return promise(wx.login).then(res => {
      code = res.code;
      return promise(wx.getUserInfo);
    }).then(res => {
      const { encryptedData, iv, userInfo } = res;
      return request('/login', { appid, code, encryptedData, iv }, 'POST')
    })
  },
  globalData: {
    user: null,
    auth: null,
  }
})