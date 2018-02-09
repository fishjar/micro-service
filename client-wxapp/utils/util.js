const Promise = require('./es6-promise')
const config = require('./config')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const promise = function (fn, obj = {}, start, end) {
  return new Promise((resolve, reject) => {
    try {
      typeof start == "function" && start();
    } catch (err) {
      console.log(err);
    }
    obj.success = (res) => resolve(res)
    obj.fail = (err) => reject(err)
    obj.complete = (e) => {
      try {
        typeof end == "function" && end();
      } catch (err) {
        console.log(err);
      }
    }
    fn(obj)
  })
}

const request = function (url, data = {}, method = "GET") {
  const { token, token_expire } = wx.getStorageSync('auth') || {}
  const { api_host } = config;
  return new Promise((resolve, reject) => {

    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...'
      });
    } else {
      wx.showToast({
        title: '加载中...',
        icon: 'loading'
      });
    }

    const obj = {
      url: api_host + url,
      method,
      data,
    };

    obj.header = {
      authentication: token,
    };

    obj.success = (res) => {
      console.log(res);
      if (res.statusCode < 300) {
        if (res.data.errcode === 0) {
          resolve(res.data.data)
        } else if (res.data.errcode === 101) {
          wx.showModal({
            title: '登陆过期!',
            showCancel: false
          })
          wx.removeStorageSync('auth')
          reject(res)
        } else {
          wx.showModal({
            title: '出错啦!',
            content: `${res.data.errmsg}`,
            showCancel: false
          })
          reject(res.data.errmsg)
        }
      } else {
        wx.showModal({
          title: '服务器错误!',
          content: `[${res.statusCode}] ${res.data}`,
          showCancel: false
        })
        reject(res)
      }
    }

    obj.fail = (res) => reject(res)
    obj.complete = () => {
      if (wx.showLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
    }

    wx.request(obj)
  });
}

module.exports = {
  formatTime,
  promise,
  request,
}
