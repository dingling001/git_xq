// pages/index/prize_detail/prize_detail.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prize_id: '',
    prize_info:[]
  },

  // 获取详情
  getDetial() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getPrizeinfo',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            prize_id: that.data.prize_id
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {
              that.setData({
              prize_info:res.data.data
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
    console.log(options)
    if (options.prize_id) {
      this.setData({
        prize_id: options.prize_id
      })
    }
    this.getDetial()
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