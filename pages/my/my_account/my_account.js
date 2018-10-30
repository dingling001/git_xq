// pages/my/my_account/my_account.js
var network = require("../../../utils/network.js");
Page({
  data: {
    cash_show: false,
    cash:''
  },
getCash(){
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
            cash:res.data.data
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

  cash_fun() {
    this.setData({
      cash_show: true
    })
  },
  cash_cancel() {
    this.setData({
      cash_show: false
    })
  }
})