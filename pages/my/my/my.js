// pages/my/my.js
var network = require("../../../utils/network.js");
var app=getApp();
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    auth_status: 0,
    user_info:[]
  },
  onLoad: function(options) {
    this.getMyinfo();
  },
  // 获取个人信息
  getMyinfo() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/getMyinfo',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              app.globalData.userInfo = res.data.data;
              that.setData({
                user_info: res.data.data
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },

  // 联系我们
  contact() {
    wx.makePhoneCall({
      phoneNumber: '13821452840',
      success(res) {
        console.log(res)
      }
    })
  },
  // 实名认证
  go_auth() {
    var auth_status = this.data.auth_status;
    switch (auth_status) {
      case 0:
        wx.navigateTo({
          url: '../my_auth/my_auth?auth_status=' + auth_status,
        });
        break;
      case 1:
        break;
    }

  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMyinfo();
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