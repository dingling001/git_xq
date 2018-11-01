// pages/my/my_demand/my_demand.js
var network = require("../../../utils/network.js");
Page({
  data: {
    tab: 0,
    page: 0,
    perpage: 10,
    myrelyList: []
  },

  changeTab(e) {
    // console.log(e)
    this.setData({
      tab: e.target.dataset.tab
    })
  },
  getmyChoiceList() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/myChoiceList',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            page: that.data.page,
            perpage: that.data.perpage
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              that.setData({
                myrelyList: res.data.data.data
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  onLoad: function (options) {
    this.getmyChoiceList()
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})