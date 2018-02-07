//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.user) {
      this.setData({ userInfo: app.globalData.user, hasUserInfo: true })
    } else {
      app.userReady = (userInfo) => {
        this.setData({ userInfo, hasUserInfo: true })
      }
    }

  },
  getUserInfo: function (e) {
    console.log(e)
  }
})
