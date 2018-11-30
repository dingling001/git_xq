// pages/my/mywork/mywork.js
var app = getApp();
Page({

  data: {
    career: '',
    career_input: ''
  },
  // 获取工作经历
  career_fun(e) {
    this.setData({
      career_input: e.detail.value
    })
  },
  // 保存
  save_fun() {
    wx.navigateTo({
      url: '../my_info/my_info?career=' + this.data.career_input
    })
  },
  onLoad: function(options) {
    if (app.globalData.userInfo.career) {
      this.setData({
        career: app.globalData.userInfo.career
      })
    }
  },


  onReady: function() {

  },


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

})