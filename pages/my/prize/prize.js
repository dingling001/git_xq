// pages/my/prize/prize.js
var network = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    perpage:10,
    prize_list:[]
  },
  // 获取中奖纪录
  luckDrawList(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/luckDrawList',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
            page:that.data.page,
            perpage: that.data.perpage
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              that.setData({
                prize_list: res.data.data.list
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
    this.luckDrawList()
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

  // 奖品详情
  go_prize_detail() {
    wx.navigateTo({
      url: '../prize_detail/prize_detail',
    })
  }
})