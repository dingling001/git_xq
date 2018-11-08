// pages/release/rel_world/rel_world.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 1
  },
  // 切换社群
  tab(e) {
    app.globalData.world_index = 1;
    wx.switchTab({
      url: '../release/release',
    })
  },
  // 切换世界
  tab1() {
    app.globalData.world_index = 2;
    wx.switchTab({
      url: '../release/release',
    })
  },
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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