// pages/my/my_rel/my_rel.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js")
Page({
  data: {
    tab: 0,
    page: 1,
    perpage: 10,
    myrelyList: []
  },

  changeTab(e) {
    // console.log(e)
    this.setData({
      tab: e.target.dataset.tab
    })
  },
  // 获取我的发布列表
  getmyRelease() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/myRelease',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            page: that.data.page,
            perpage: that.data.perpage
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              var list = res.data.data.list;
              for (var i in list) {
                list[i].create_time = util.formatDate(new Date(list[i].create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
              }
              that.setData({
                myrelyList: list
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 选择简历
  choose_reItem() {

  },
  onLoad: function(options) {
    this.getmyRelease()
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