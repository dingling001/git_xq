// pages/my/my_vip/my_vip.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {
    vip_status: false,
    vip_c: 0,
    vip_list: [],
    vipid: '',
    vip_time: null
  },
  // 会员切换
  vip_fun(e) {
    var that = this;
    if (this.data.vip_c == e.currentTarget.dataset.index) {
      return false;
    } else {
      that.setData({
        vip_c: e.currentTarget.dataset.index,
        vipid: e.currentTarget.dataset.vipid,
      })
    }
  },
  //  获取可充值会员列表
  getVipList() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/getVipList',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {
              that.setData({
                vip_list: res.data.data,
                vipid: res.data.data[0].id
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },

  // 开通会员
  vip() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/recharge',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            vip_id: that.data.vipid
            // order_sn: "R154111411560494200"
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              wx.requestPayment({
                timeStamp: res.data.data.timestamp,
                nonceStr: res.data.data.nonce_str,
                package: 'prepay_id=' + res.data.data.prepay_id,
                signType: 'MD5',
                paySign: res.data.data.paySign,
                success(res_pay) {
                  wx.showToast({
                    title: '支付成功!',
                  });
                  that.setData({
                    vip_time: util.dateDiff(app.globalData.userInfo.vip_time)
                  })
                },
                fail(res_fail) {
                  console.log(res_fail);
                  wx.showToast({
                    title: '取消支付',
                    icon: 'none'
                  })
                }
              })
            } else {
              wx.showToast({
                title: res.data.data,
                icon: 'none'
              })
            }
          }
        })
      },
    })
  },
  onLoad: function(options) {
    this.getVipList();
    this.setData({
      vip_time: util.dateDiff(app.globalData.userInfo.vip_time)
    })
    console.log(this.data.vip_time)
  },

  onReady: function() {

  },

  onShow: function() {
    this.setData({
      vip_time: util.dateDiff(app.globalData.userInfo.vip_time)
    })
  },


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  // onShareAppMessage: function() {

  // }
})