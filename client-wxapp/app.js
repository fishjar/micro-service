//app.js
const { promise, request } = require('./utils/util')
const { appid } = require('./utils/config')
App({
  onLaunch: function () {
    wx.checkSession({
      success: () => {
        //session 未过期，并且在本生命周期一直有效
        console.log('session 未过期')
        const { token, expire, user } = wx.getStorageSync('auth') || {}
        const now = Date.now() / 1000
        if (token && expire > now) {
          this.globalData.auth = { token, expire }
          this.globalData.user = user
        } else {
          console.log('expired')
          this.login()
        }
      },
      fail: () => {
        //登录态过期
        console.log('session 过期')
        this.login() //重新登录
      }
    })
  },

  login: function () {
    promise(wx.login).then(res => {
      const code = res.code;
      return request('/login', { appid, code }, 'POST')
    }).then(res => {
      const { token, expire, user } = res
      wx.setStorageSync('auth', res)
      this.globalData.auth = { token, expire }
      this.globalData.user = user
    })
  },

  globalData: {
    user: null,
    auth: null,
  },

})