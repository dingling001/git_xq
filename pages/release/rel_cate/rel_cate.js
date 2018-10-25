// pages/release/rel_cate/rel_cate.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catelist: [],
    list: [],
    ind: 0
  },
  // wx.removeStorage({
  //   key: 'cate_info',
  //   success: (res) => {
  //     console.log(res)
  //   },
  // })
  // 获取需求类型
  getCatelist() {
    var catelist = [];
    var cate_list = [];
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getCatelist',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              var data = res.data.data.list
              for (var i in data) {
                cate_list.push(data[i].cate_name);
                for (var j in data[i].child) {
                  data[i].child[j].cover = util.base_img_url + data[i].child[j].cover
                }
              }
              that.setData({
                catelist: data,
                list: cate_list
              })
              console.log(that.data.catelist)
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 需求类型切换
  changenav(e) {
    var ind = e.currentTarget.dataset.index;
    this.setData({
      ind: ind
    })
  },
  // 回传选择
  back_rel(e) {
    console.log(e)
    var cate_name = e.currentTarget.dataset.name;
    var cate_id = e.currentTarget.dataset.id;
    var cate_info = {
      cate_name: cate_name,
      cate_id: cate_id
    }
    // wx.setStorage({
    //   key: 'cate_info',
    //   data: cate_info,
    // });
    app.globalData.cate_info = cate_info
    wx.switchTab({
      url: '../release/release',
    })
  },
  onLoad: function(options) {
  
 
    this.getCatelist();
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