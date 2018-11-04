// pages/start/start.js
var network = require("../../utils/network.js")
Page({
  data: {
    third_session: '',
    iv: '',
    encryptedData: ''
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    if (options.login_code == 3) {
      wx.showModal({
        title: '登录',
        showCancel:false,
        content: '登录失效,点击立即开启,重启小程序',
        success:function(res){
          
        }
      })
    }
  },
  login(e) {
    var that = this;
    if (e.detail.userInfo) {
      wx.getStorage({
        key: 'token',
        success: (res) => {
          wx.showLoading({
            title: '正在启动',
            icon: 'none'
          })
          setTimeout(() => {
            wx.hideLoading();
            wx.switchTab({
              url: '../index/index',
            })
          }, 1000)
        },
        fail: (erro) => {
          wx.login({
            success: (res_login) => {
              network.POST({
                url: 'login/login',
                header: 'application/x-www-form-urlencoded',
                params: {
                  code: res_login.code,
                },
                success(res) {
                  // console.log(res)
                  if (res.data.code == 1) {
                    that.setData({
                      iv: e.detail.iv,
                      encryptedData: e.detail.encryptedData,
                      third_session: res.data.data.third_session
                    })
                    wx.setStorage({
                      key: 'token',
                      data: res.data.data.third_session,
                    })
                    that.userAuth()
                  } else if (res.data.code == 3) {
                    console.log('token失效了')
                    that.login();
                  } else {
                    // console.log(res);
                    that.login();
                  }
                }
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '请授权小程序，获得更好的体验',
        icon: 'none'
      })
    }
  },
  // 用户授权注册登录
  userAuth() {
    var that = this;
    wx.showLoading({
      title: '正在启动',
      icon: 'none'
    })
    var post={
      token: that.data.third_session,
      iv: that.data.iv,
      encryptedData: that.data.encryptedData
    }
    network.POST({
      url: 'login/userAuth',
      header: 'application/x-www - form - urlencoded',
      params: {
        token: that.data.third_session,
        iv: that.data.iv,
        encryptedData: that.data.encryptedData
      },
      success(res) {
        if (res.data.code == 1) {
          wx.switchTab({
            url: '../index/index',
          })
          wx.hideLoading();
        } else {
          console.log(res);
        }
      }
    })
  }
})