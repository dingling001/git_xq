//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力


    // 登录
    wx.login({
      success: res => {
  
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    cate_info:{
      cate_name:'',
      cate_id:''
    },
    world_index:1
  }
})