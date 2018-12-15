// pages/my/my_rel/my_rel.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
var px2rpx = 2,
  windowWidth = 375;
var p = 1;
// 请求数据
var loadMore = function(that) {
  that.setData({
    hidden: false,
  });
  wx.showNavigationBarLoading() //在标题栏中显示加载
  wx.getStorage({
    key: 'token',
    success: (res_token) => {
      network.POST({
        url: 'index/myRelease',
        header: 'application/x-www - form - urlencoded',
        params: {
          token: res_token.data,
          page: p,
          perpage: that.data.perpage
        },
        success(res) {
          if (res.data.code == 1 && !that.data.nomore) {
            var list = that.data.myrelyList;
            // var list_s = [];
            // var list_j = [];
            // var list_c = [];
            // console.log(res.data.data.list)
            if (res.data.data.list.length == 0) {
              that.setData({
                nomore: true,
                hidden: false
              })
            } else {
              for (let i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].create_time = util.formatDate(new Date(res.data.data.list[i].create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
                // if (res.data.data.list[i].status == 0) {
                //   list_s.push(res.data.data.list[i])
                // } else if (res.data.data.list[i].status == 2) {
                //   list_j.push(res.data.data.list[i])
                // } else if (res.data.data.list[i].status == 4) {
                //   list_c.push(res.data.data.list[i])
                // }

                if (list.length <= res.data.data.count) {
                  list.push(res.data.data.list[i]);
                }
              }
              p++;
              that.setData({
                hidden: true
              });
              that.setData({
                myrelyList: list,
                // list_s: list_s,
                // list_j: list_j,
                // list_c: list_c
              })
            }
          } else {
            // console.log(res);
          }
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        },
        fail: (erro) => {
          //失败后
          console.log(erro)
        },

      })
    },
  })
}
Page({
  data: {
    tab: 0,
    page: 1,
    perpage: 5,
    myrelyList: [],
    list_s: [],
    list_j: [],
    list_c: [],
    scrollTop: 0,
    scrollHeight: 0,
    hidden: true,
    nomore: false
  },
  //页面滑动到底部
  bindDownLoad: function() {
    var that = this;
    loadMore(that);
    // console.log("lower");
  },
  scroll: function(event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function(event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    p = 1;
    this.setData({
      goods: [],
      scrollTop: 0
    });
    loadMore(this);
    // console.log("lower");
  },

  // 切换状态
  changeTab(e) {
    // console.log(e)
    var that = this;
    // this.getmyRelease();
    this.setData({
      tab: e.target.dataset.tab,
      page: 1,
      nomore: false,
    })
    loadMore(that);
  },
  // 获取我的发布列表
  // getmyRelease() {
  //   var that = this;
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   wx.getStorage({
  //     key: 'token',
  //     success: (res_token) => {
  //       network.POST({
  //         url: 'index/myRelease',
  //         header: 'application/x-www - form - urlencoded',
  //         params: {
  //           token: res_token.data,
  //           page: that.data.page,
  //           perpage: that.data.perpage
  //         },
  //         success(res) {
  //           // console.log(res);
  //           if (res.data.code == 1) {
  //             var list = res.data.data.list;
  //             var list_s = [];
  //             var list_j = [];
  //             var list_c = [];
  //             for (var i in list) {
  //               list[i].create_time = util.formatDate(new Date(list[i].create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
  //               if (list[i].status == 0) {
  //                 list_s.push(list[i])
  //               } else if (list[i].status == 2) {
  //                 list_j.push(list[i])
  //               } else if (list[i].status == 4) {
  //                 list_c.push(list[i])
  //               }
  //             }

  //             that.setData({
  //               myrelyList: list,
  //               list_s: list_s,
  //               list_j: list_j,
  //               list_c: list_c
  //             })
  //           } else {
  //             console.log(res);
  //           }
  //           wx.hideLoading()
  //         }
  //       })
  //     },
  //   })
  // },
  onLoad: function(options) {
    // this.getmyRelease();
    var that = this;
    loadMore(that);
    wx.getSystemInfo({
      success: function(res) {
        windowWidth = res.windowWidth;
        px2rpx = 750 / windowWidth;
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
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