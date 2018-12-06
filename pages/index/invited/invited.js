// pages/index/invited/invited.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
const app = getApp();
Page({

  data: {
    order_sn: '',
    rid: '',
    order_detail: [],
    agree: false,
    auth_status: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    if (options) {
      this.setData({
        order_sn: options.order_sn,
        rid: options.rid
      })
      this.getInvited();
    }
    this.ifrealnameAuth();
  },
  // 获取详情
  getInvited() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getApplyDetail',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            order_sn: that.data.order_sn
          },
          success(res) {
            console.log(res);
            var list = res.data.data
            list.create_time = util.formatDate(new Date(list.create_time * 1000), 'yyyy-MM-dd hh:mm');
            if (res.data.code == 1) {
              that.setData({
                order_detail: list
              })
            }
            // console.log(that.data.order_detail)
          }
        })
      },
    })
  },
  // 联系我们
  phone_call() {
    if (this.data.order_detail.tel) {
      wx.makePhoneCall({
        phoneNumber: this.data.order_detail.tel,
        success(res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '客服当前不在线',
        icon: 'none'
      })
    }
  },
  // 同意协议
  agreen_fun() {
    if (this.data.agree == false) {
      this.setData({
        agree: true
      })
    } else {
      this.setData({
        agree: false
      })
    }
  },
  // 查看协议
  agreement_fun() {
    wx.navigateTo({
      url: '../../my/agreement/agreement',
    })
  },
  // 应邀
  invited_fun(e) {
    var that = this;
    if (that.data.agree == false) {
      wx.showToast({
        title: '请同意用户协议',
        icon: 'none'
      })
    } else if (this.data.auth_status == false) {
      wx.showToast({
        title: '未认证用户，暂不可应邀需求',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          var post = {
            token: res_token.data,
            rid: that.data.order_sn,
            formid: e.detail.formId,
            intro_openid: app.globalData.openid
          }
          // console.log(post)
          network.POST({
            url: 'api/apply',
            // header: 'application/x-www - form - urlencoded',
            params: post,
            success(res) {
              console.log(res);
              if (res.data.code == 1) {
                wx.showToast({
                  title: '应邀成功',
                })
              } else {
                console.log(res);
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                })
              }
            }
          })
        },
      })

    }
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
                confirmText: '我的->联系我们',
                confirmColor: '#333',
                success: (res) => {
                  console.log(res)
                  if (res.confirm == true) {
                    wx.switchTab({
                      url: '../../my/my',
                    })
                  } else {
                    wx.switchTab({
                      url: '../../index/index',
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '请认证后应邀需求！',
                icon: 'none'
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '../../my/auth/auth',
                })
              }, 3000)
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