//app.js
const { promise, request } = require('./utils/util')
const Promise = require('./utils/es6-promise')
const { appid } = require('./utils/config')
App({
  onLaunch: function () {

    // wx.checkSession({
    //   success: () => {
    //     //session 未过期，并且在本生命周期一直有效
    //     console.log('session 未过期')
    //     const { token, expire, user } = wx.getStorageSync('auth') || {}
    //     const now = Date.now() / 1000
    //     if (token && expire > now) {
    //       console.log('token 未过期')
    //     } else {
    //       console.log('token 过期')
    //       this.login()
    //     }
    //   },
    //   fail: () => {
    //     //登录态过期
    //     console.log('session 过期')
    //     //重新登录
    //     this.login()
    //     // this.login().then(() => {
    //     //   return this.getUserInfo()
    //     // }).then(() => {
    //     //   console.log('----------')
    //     // })
    //   }
    // })

  },

  checkLogin: function () {
    return promise(wx.checkSession).then(() => {
      console.log('session 未过期')
      const { token, expire } = wx.getStorageSync('auth')
      const now = Date.now() / 1000
      if (token && expire > now) {
        console.log('token 未过期')
        const user = wx.getStorageSync('user')
        return Promise.resolve(user)
      } else {
        console.log('token 过期')
        return this.login()
      }
    }).catch(() => {
      console.log('session 过期')
      return this.login()
    })
  },

  login: function () {
    return promise(wx.login).then(res => {
      console.log(res)
      const code = res.code;
      return request('/login', { appid, code }, 'POST')
    }).then(res => {
      const { token, expire, user } = res
      wx.setStorageSync('auth', { token, expire })
      wx.setStorageSync('user', user)
      return this.getUserInfo()
    })
  },

  getUserInfo: function () {
    return promise(wx.getUserInfo).then(res => {
      const { encryptedData, iv } = res;
      return request('/wxuser', { encryptedData, iv }, 'POST')
    }).then(res => {
      const user = wx.getStorageSync('user')
      Object.assign(user, res)
      wx.setStorageSync('user', user)
      return Promise.resolve(user)
    })
  },

  globalData: {
    user: null,
    auth: null,
  },

})