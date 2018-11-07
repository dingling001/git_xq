// pages/index/prize/prize.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js")
Page({
  data: {
    times: 0,
    list: [{
        "id": 8,
        "title": "花里胡哨的月饼(三)",
        "cover": "../../assets/imgs/banner.jpg",
        "join": 0
      },
      {
        "id": 7,
        "title": "花里胡哨的月饼(二)1",
        "cover": "../../assets/imgs/banner.jpg",
        "join": 1
      },
    ],
    banner: '',
    auth_status: false
  },


  onLoad: function(options) {
    if (options.pic) {
      this.setData({
        banner: options.pic
      })
    }
    // this.getlist();
  },

  //  获取抽奖列表
  getlist() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getPrizelist',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              var list = res.data.data;
              for (var i in list) {
                list[i].cover = util.base_img_url + list[i].cover
              }
              that.setData({
                list: list
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 去详情
  godetial(e) {
    let id = e.target.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: '../prize_detail/prize_detail?prize_id='+id,
    })
  },
  // 抽奖
  pize_fun(e) {
    console.log(e)
    this.ifrealnameAuth();
    let that = this;
    let id = e.target.dataset.id;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/luckyDraw',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            formid: e.detail.formId,
            prize_id: id
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              wx.navigateTo({
                url: '../prize_suc/prize_suc?prize_id=' + id,
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
    console.log(e)
  },
  // 判断身份
  ifrealnameAuth() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/ifrealnameAuth',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            if (res.data.code == 1) {
              that.setData({
                auth_status: true
              })
            } else if (res.data.code == 19) {
              wx.showModal({
                title: '账号异常',
                content: '你的账号目前有问题，请联系我们处理',
                cancelText: '暂不需要',
                cancelColor: '#ccc',
                confirmText: '联系客服',
                confirmColor: '#333',
                success: (res) => {
                  console.log(res)
                  if (res.confirm == true) {
                    wx.makePhoneCall({
                      phoneNumber: '13821452840',
                      success(res) {
                        console.log(res)
                      }
                    })
                  } else {
                    wx.switchTab({
                      url: '../../index/index',
                    })
                  }
                }
              })
            } else {
              wx.navigateTo({
                url: '../../my/auth/auth',
              })
            }
          }
        })
      },
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