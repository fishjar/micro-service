//index.js
const { promise, request } = require('../../utils/util')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    //
  },
  bindViewTap() {
    promise(wx.getUserInfo).then(res => {
      console.log(res);
      const { encryptedData, iv } = res;
      return request('/wxuser', { encryptedData, iv }, 'POST')
    }).then(res => {
      const auth = wx.getStorageSync('auth') || {}
      Object.assign(auth.user, res)
      wx.setStorageSync('auth', auth)
      this.setData({
        userInfo: res,
        hasUserInfo: true,
      })
    }).catch(err => console.log(err))
  },
  bindUserTap() {
    const { id } = this.data.userInfo;
    request(`/users/${id}`).then(res=>{
      //
    })
  },
})
