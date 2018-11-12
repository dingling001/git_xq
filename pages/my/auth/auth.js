// pages/my/auth/auth.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
Page({
  data: {
    add: false,
    id_src: '',
    name: '',
    id_card: '',
    img: '',
    rel_img: '',
    img1: '',
    rel_img1: '',
    img2: '',
    rel_img2: '',
    phone: '',
    imgs: []
  },
  // 姓名
  name_tex(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 身份证号码
  id_card_text(e) {
    this.setData({
      id_card: e.detail.value
    })
  },
  // 电话
  phone_text(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 上传手持身份证
  img_fun() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        const tempFilePaths = res.tempFilePaths
        that.setData({
          img: res.tempFilePaths[0]
        })
        wx.getStorage({
          key: 'token',
          success: (res_token) => {
            wx.uploadFile({
              url: 'https://mp.jianghairui.com/index/api/uploadImage',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                token: res_token.data
              },
              success(res_suc) {
                var data = JSON.parse(res_suc.data)
                if (data.code == 1) {
                  that.setData({
                    rel_img: data.data.path
                  })
                  wx.hideToast()
                  wx.showToast({
                    title: '上传成功',
                  })
                } else {
                  wx.showToast({
                    title: res_suc.data[message],
                    icon: 'none'
                  })
                }
              }
            })
          },
        })
      }
    })
  },
  // 上传正面
  img1_fun() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        const tempFilePaths = res.tempFilePaths
        that.setData({
          img1: res.tempFilePaths[0]
        })
        wx.getStorage({
          key: 'token',
          success: (res_token) => {
            wx.uploadFile({
              url: 'https://mp.jianghairui.com/index/api/uploadImage',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                token: res_token.data
              },
              success(res_suc) {
                var data = JSON.parse(res_suc.data)
                if (data.code == 1) {
                  that.setData({
                    rel_img1: data.data.path
                  })
                  wx.hideToast()
                  wx.showToast({
                    title: '上传成功',
                  })
                } else {
                  wx.showToast({
                    title: res_suc.data[message],
                    icon: 'none'
                  })
                }
              }
            })
          },
        })
      }
    })
  },
  //上传反面
  img2_fun() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        const tempFilePaths = res.tempFilePaths
        that.setData({
          img2: res.tempFilePaths[0]
        })
        wx.getStorage({
          key: 'token',
          success: (res_token) => {
            wx.uploadFile({
              url: 'https://mp.jianghairui.com/index/api/uploadImage',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                token: res_token.data
              },
              success(res_suc) {
                var data = JSON.parse(res_suc.data)
                if (data.code == 1) {
                  that.setData({
                    rel_img2: data.data.path
                  })
                  wx.hideToast()
                  wx.showToast({
                    title: '上传成功',
                  })
                } else {
                  wx.showToast({
                    title: res_suc.data[message],
                    icon: 'none'
                  })
                }
              }
            })
          },
        })
      }
    })
  },
  // 提交审核
  sub_auth() {
    var that = this;
    var idcard_reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var mobile_reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (that.data.name == '') {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none'
      })
    } else if (!idcard_reg.test(that.data.id_card)) {
      wx.showToast({
        title: '请输入正确的身份证号码',
        icon: 'none'
      })
    } else if (!mobile_reg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (that.data.rel_img == '') {
      wx.showToast({
        title: '请上传手持身份证照片',
        icon: 'none'
      })
    } else if (that.data.rel_img1 == '') {
      wx.showToast({
        title: '请上传身份证正面',
        icon: 'none'
      })
    } else if (that.data.rel_img2 == '') {
      wx.showToast({
        title: '请上传身份证反面',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res) => {
          var post = {
            token: res.data,
            realname: that.data.name,
            identity_num: that.data.id_card,
            tel: that.data.phone,
            image: [that.data.rel_img, that.data.rel_img1, that.data.rel_img2]
          };
          network.POST({
            url: 'index/realnameAuth',
            header: 'application/x-www - form - urlencoded',
            params: post,
            success(res) {
              console.log(res);
              if (res.data.code == 1) {
                wx.showToast({
                  title: '已提交审核',
                });
                wx.navigateTo({
                  url: '../my_auth/my_auth?auth_status=0',
                })
              } else {
                console.log(res);
              }
            }
          })
        },
      })

    }
  },
  onLoad: function(options) {

  },


  onReady: function() {

  },


  onShow: function() {

  },


  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

})