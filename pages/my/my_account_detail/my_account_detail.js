// pages/my/my_account_detail/my_account_detail.js
var network = require("../../../utils/network.js");
Page({


  data: {
    myrelyList: [],
    cash_placeholder: 0,
    cash: 0,
    cash_show: false
  },

  // 监听input
  cash_input(e) {
    this.setData({
      cash: e.detail.value
    })
    if (e.detail.value >= 0) {
      this.setData({
        cash_show: true
      })
    } else {
      this.setData({
        cash_show: false,
        cash: 0
      })
    }
  },
  // 提现
  cash_fun(e) {
    console.log(e)
    var that = this;
    if (that.data.cash <= 0) {
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          network.POST({
            url: 'index/withdrawApply',
            header: 'application/x-www - form - urlencoded',
            params: {
              token: res_token.data,
              formid: e.detail.formId,
              money: that.data.cash
            },
            success(res) {
              console.log(res);
              if (res.data.code == 1) {
                wx.showToast({
                  title: '提现成功',
                })
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                })
              }
            }
          })
        },
      })
    }
  },
  onLoad: function(options) {
    console.log(options);
    this.setData({
      cash_placeholder: options.cash
    })
  },


  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})