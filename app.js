//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力


    // 登录
    wx.login({
      success: res => {

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null, //个人信息
    cate_info: {
      cate_name: '',
      cate_id: ''
    }, //发布分类
    world_index: 1, //默认社区
  }
})