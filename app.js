//app.js
var network = require("./utils/network.js");

App({
  onLaunch: function() {
    this.getSettings()
    this.getMyopenid()
  },
  globalData: {
    isIphoneX: false,
    userInfo: null, //个人信息
    cate_info: {
      cate_name: '',
      cate_id: ''
    }, //发布分类
    world_index: 1, //默认社区
    contact: '', //电话号码
    openid: '', //个人openid
  },
  onShow: function() {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    })
  },
  // 获取费率
  getSettings() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getSettings',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {
              that.globalData.contact = res.data.data.contact
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 获取我的openid
  getMyopenid() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getMyOpenid',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            // console.log(res)
            if (res.data.code == 1) {
              that.globalData.openid = res.data.data
            }
          }
        })
      },
    })
  },
})