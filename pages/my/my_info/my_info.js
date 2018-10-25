// pages/my/my_info/my_info.js
var network = require("../../../utils/network.js");
var app = getApp();
Page({

  data: {
    userInfo: [],
    sex: [
      '男',
      '女'
    ],
    sex_index: 0,
    nickname: '',
    age: [],
    age_index: 11,
    jobList: []
  },
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if (this.data.userInfo.gender == 1) {
      this.setData({
        sex_index: 0
      })
    } else {
      this.setData({
        sex_index: 1
      })
    };
    var agelist = []
    for (var i = 1; i <= 120; i++) {
      agelist.push(i)
    };
    this.setData({
      age: agelist
    });
    this.getJobList();
    // console.log(app.globalData.userInfo)
  },
  // 修改昵称
  nickname_fun(e) {
    nickname: e.detail.value
  },
  // 性别选择
  sex_fun(e) {
    this.setData({
      sex_index: e.detail.value
    })
  },
  //修改年龄
  age_fun(e) {
    this.setData({
      age_index: e.detail.value
    })
  },
  // 获取职业列表
  getJobList() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/getJobList',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              var joblist = []
              for (var i in res.data.data) {
                joblist.push(res.data.data[i].name);
              }
              that.setData({
                jobList: joblist
              })
              console.log(res.data.data)
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 选择职业
  job_fun(e) {
  app.globalData.userInfo.job = this.data.jobList[e.detail.value];
  this.setData({
    userInfo: app.globalData.userInfo
  });
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