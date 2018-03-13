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
    app.checkLogin().then((res) => {
      console.log(res)
      this.setData({ userInfo: res, hasUserInfo: true })
    }).catch(err => {
      console.log(err)
    })
  },
  bindViewTap() {
    app.getUserInfo().then((res) => {
      this.setData({ userInfo: res, hasUserInfo: true })
    })
  },
  bindUserTap() {
    const { id } = this.data.userInfo;
    request(`/users/${id}`).then(res => {
      //
    })
  },
  bindPay() {
    request(`/test`, {}, 'POST').then(res => {
      //
    })
  },
  login() {
    app.login();
  },
  uploadFile(e) {
    wx.chooseImage({
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        const { token, token_expire } = wx.getStorageSync('auth') || {}
        // obj.header = {
        //   authentication: token,
        // };
        wx.uploadFile({
          // url: 'http://192.168.0.103:9106/upload/ajax',
          // url: 'http://192.168.43.172:9101/upload',
          url: 'http://192.168.0.103:9101/upload',
          filePath: tempFilePaths[0],
          header: {
            authentication: token,
          },
          name: 'file',
          formData: {
            title: 'test',
            user_id: 1,
            description: 'description description',
            resize: 400,
            thumb: 120
          },
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            // var data = res.data
            //do something
          }
        })
      }
    })
  },
  wxPay() {
    request(`/wxpay`, {
      body: 'test',
      total_fee: 1,
    }, 'POST').then(res => {
      wx.requestPayment({
        'nonceStr': res.nonceStr,
        'package': res.package,
        'paySign': res.paySign,
        'signType': res.signType,
        'timeStamp': res.timeStamp,
        'success': function (res) {
          wx.showModal({
            title: '支付成功!',
            showCancel: false
          })
        },
        'fail': function (res) {
          wx.showModal({
            title: '支付失败!',
            content: res,
            showCancel: false
          })
        }
      });

    })
  },
  bindTest() {
    console.log(app.globalData)
  },
})
