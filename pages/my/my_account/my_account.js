// pages/my/my_account/my_account.js
var network = require("../../../utils/network.js");
Page({
  data: {
    cash_show: false,
    cash: ''
  },
  getCash() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/myAccount',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              that.setData({
                cash: res.data.data
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },

  onLoad: function(options) {
    this.getCash()
  },

  onReady: function() {

  },


  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  cash_fun() {
    if (this.data.cash == 0) {
      wx.showToast({
        title: '余额不足',
        icon: 'none'
      })
    } else {
      this.setData({
        cash_show: true
      })
    }
  },
  cash_cancel() {
    this.setData({
      cash_show: false
    })
  }
})