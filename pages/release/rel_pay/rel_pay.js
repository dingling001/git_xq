// pages/release/rel_pay/rel_pay.js
var network = require("../../../utils/network.js");
Page({

  data: {
    order_sn: "",
    orderInfo: []
  },
  // 获取详情
  getorderinfo() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getReqDetail',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            order_sn: that.data.order_sn
            // order_sn: "R154111411560494200"
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {
              that.setData({
                orderInfo: res.data.data
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 订单支付
  pay_order() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'pay/pay',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            order_sn: that.data.order_sn
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
                  wx.showModal({
                    title: '发布成功',
                    content: '您的需求已发布成功',
                    showCancel: true,
                    cancelText: '返回首页',
                    cancelColor: '#ccc',
                    confirmText: '再发一个',
                    confirmColor: '#fd4336',
                    success(res) {
                      if (res.confirm) {
                        wx.switchTab({
                          url: '../release/release',
                        })
                      } else if (res.cancel) {
                        wx.switchTab({
                          url: '../../index/index',
                        })
                      }
                    }
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
    console.log(options)
    if (options.order_sn) {
      this.setData({
        order_sn: options.order_sn
      })
    }
    this.getorderinfo()
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