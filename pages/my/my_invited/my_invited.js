// pages/my/my_invited/my_invited.js
var network = require("../../../utils/network.js");
Page({


  data: {
    page:0,
    perpage:10,
    myApplyList:[]
  },

  onLoad: function (options) {
    this.getmyinvited()
  },
getmyinvited(){
  var that = this;
  wx.getStorage({
    key: 'token',
    success: (res_token) => {
      network.POST({
        url: 'index/myApplyList',
        header: 'application/x-www - form - urlencoded',
        params: {
          token: res_token.data,
          page:that.data.page,
          perpage: that.data.perpage
        },
        success(res) {
          console.log(res);
          if (res.data.code == 1) {
            that.setData({
              myApplyList:res.data.data.list
            })
          } else {
            console.log(res);
          }
        }
      })
    },
  })
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