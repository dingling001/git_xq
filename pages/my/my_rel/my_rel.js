// pages/my/my_rel/my_rel.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js")
Page({
  data: {
    tab: 0,
    page: 1,
    perpage: 10,
    myrelyList: [],
    list_s: [],
    list_j: [],
    list_c: []
  },
  // 切换状态
  changeTab(e) {
    // console.log(e)
    this.getmyRelease();
    this.setData({
      tab: e.target.dataset.tab
    })
  },
  // 获取我的发布列表
  getmyRelease() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
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
            // console.log(res);
            if (res.data.code == 1) {
              var list = res.data.data.list;
              var list_s = [];
              var list_j = [];
              var list_c = [];
              for (var i in list) {
                list[i].create_time = util.formatDate(new Date(list[i].create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
                if (list[i].status == 0) {
                  console.log(i)
                  list_s.push(list[i])
                } else if (list[i].status == 2) {
                  list_j.push(list[i])
                } else if (list[i].status == 4) {
                  list_c.push(list[i])
                }
              }

              that.setData({
                myrelyList: list,
                list_s: list_s,
                list_j: list_j,
                list_c: list_c
              })
            } else {
              console.log(res);
            }
            wx.hideLoading()
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