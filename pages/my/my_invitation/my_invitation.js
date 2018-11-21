// pages/my/my_invitation/my_invitation.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
const app = getApp();
Page({

  data: {
    isIphoneX: false
  },

  onLoad: function(options) {
    this.setData({
      isIphoneX: app.globalData.isIphoneX
    })
    console.log(this.data.isIphoneX)
  },

  onReady: function() {

  },


  onShow: function() {

  },


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