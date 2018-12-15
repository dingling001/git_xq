// pages/my/my.js
var network = require("../../../utils/network.js");
var app = getApp();
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    auth_status: 0,
    user_info: [],
    contact: ''
  },
  onLoad: function(options) {
    // console.log(options)
    this.getMyinfo();
    this.setData({
      contact: app.globalData.contact
    })
    // console.log(app.globalData)
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
            // console.log(res);
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
    if (this.data.contact) {
      wx.makePhoneCall({
        phoneNumber: this.data.contact,
        success(res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '客服当前不在线',
        icon: 'none'
      })
    }
  },
  // 实名认证
  go_auth() {
    var auth_status = this.data.user_info.status;
    console.log(auth_status)
    switch (auth_status) {
      case 0:
        wx.navigateTo({
          url: '../auth/auth?auth_status=' + auth_status,
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../my_auth/my_auth?auth_status=' + auth_status,
        });
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

 
})