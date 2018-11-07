// pages/release/release.js
var network = require("../../../utils/network.js");
var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    img_list: [],
    images: [],
    showAdd: true,
    address: '',
    lat: '',
    lon: '',
    fee: '',
    title: "",
    content: '',
    price: '',
    req_rate: '',
    num: '',
    end_time: '',
    start_time: '',
    showdate: true,
    list: [],
    catelist: [],
    index: 0,
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    cate_id: '',
    cate_name: '',
    auth_status: false,
    choose_time: '',
    timelist: [],
    times: [],
    tindex: 0,
    temp: 0,
    token: '',
    world: ['', '社群', '世界'],
    world_index: 1
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
              that.setData({
                req_rate: res.data.data.req_rate
              })
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },

  // 标题
  title_input(e) {
    this.setData({
      title: e.detail.value,
    })
  },
  //发布内容
  content_input(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  // 需求金额
  price_input(e) {
    this.setData({
      price: parseFloat(e.detail.value).toFixed(2),
      fee: parseFloat(e.detail.value * this.data.req_rate).toFixed(2)
    })
  },
  // 需求人数
  num_input(e) {
    this.setData({
      num: e.detail.value,
    })
  },
  // 有效时间
  pickeTime(e) {
    this.setData({
      tindex: e.detail.value
    })
  },
  // end_date_fun(e) {
  //   this.setData({
  //     showdate: false
  //   })
  //   console.log(e)
  // },
  // end_time_fun(e) {
  //   this.setData({
  //     showdate: true
  //   })
  // },
  // 发布需求
  release_fun(e) {
    var that = this;
    if (that.data.auth_status == false) {
      wx.navigateTo({
        url: '../../my/auth/auth',
      })
    } else if (that.data.title == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      })
    } else if (that.data.images.length == 0) {
      wx.showToast({
        title: '请上传至少一张图',
        icon: 'none',
      })
    } else if (that.data.content == '') {
      wx.showToast({
        title: '请输入需求内容',
        icon: 'none',
      })
    } else if (!/^[0-9]*$/.test(parseFloat(that.data.price))) {
      wx.showToast({
        title: '请输入需求金额',
        icon: 'none',
      })
    } else if (!/^\+?[1-9][0-9]*$/.test(parseInt(that.data.num))) {
      wx.showToast({
        title: '请输入需求人数',
        icon: 'none',
      })
    } else if (that.data.cate_id == '') {
      wx.showToast({
        title: '请选择需求类型',
        icon: 'none',
      })
    } else if (that.data.lon == '' || that.data.lat == '' || that.data.address == '') {
      wx.showToast({
        title: '请选择需求地点',
        icon: 'none',
      })
    } else if (that.data.title == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      })
    } else {
      console.log('有效：' + util.formatTime(new Date(), 3, that.data.tindex + 1))
      wx.showModal({
        title: '确定发布',
        content: '请尽量完善你的需求，获得更好的完成效果',
        showCancel: true,
        cancelText: '再看看',
        cancelColor: '#ccc',
        confirmText: '发布',
        confirmColor: '#fd5a2f',
        success: (res) => {
          var post = {
            token: that.data.token,
            title: that.data.title,
            content: that.data.content,
            price: that.data.price,
            address: that.data.address,
            lon: that.data.lon,
            lat: that.data.lat,
            num: that.data.num,
            cate_id: that.data.cate_id,
            end_time: util.formatTime(new Date(), 3, parseInt(that.data.tindex) + parseInt(1)),
            deadline: that.data.dateTimeArray[0][that.data.dateTime[0]] + '-' + that.data.dateTimeArray[1][that.data.dateTime[1]] + '-' + that.data.dateTimeArray[2][that.data.dateTime[2]] + ' ' + that.data.dateTimeArray[3][that.data.dateTime[3]] + ':' + that.data.dateTimeArray[4][that.data.dateTime[4]],
            formid: e.detail.formId,
            image: that.data.images,
            world: that.data.world_index
          };
          if (res.confirm == true) {
            console.log(post)
            network.POST({
              url: 'api/requireRelease',
              header: 'application/x-www - form - urlencoded',
              params: post,
              success(res) {
                // console.log(res);
                if (res.data.code == 1) {
                  console.log(res)
                  wx.showToast({
                    title: '发布成功',
                  });
                  wx.redirectTo({
                    url: '../rel_pay/rel_pay?order_sn=' + res.data.data.order_sn,
                  })
                } else {
          
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 1500
                  })
                }
              }
            })
          }
        },
      })
    }
  },
  onLoad: function(options) {
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        this.setData({
          token: res_token.data
        });
      },
    })
    var obj = util.dateTimePicker(this.data.startYear, this.data.endYear);
    var lastTime = obj.dateTime.pop();
    var lastArray = obj.dateTimeArray.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTime: obj.dateTime,
    });
    this.ifrealnameAuth();
    this.getSettings();
    var timelist = [];
    var times = []
    for (var i = 1; i <= 48; i++) {
      timelist.push({
        value: i,
        label: i + '小时'
      });
      times.push(i + '小时')
    }
    this.setData({
      timelist: timelist,
      times: times
    })
  },
  // 获取时间
  changedateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = util.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });

  },
  onReady: function() {

  },

  onShow: function() {
    this.ifrealnameAuth();
    var cate_name = app.globalData.cate_info.cate_name;
    var cate_id = app.globalData.cate_info.cate_id;
    var world_index = app.globalData.world_index;
    this.setData({
      cate_name: cate_name,
      cate_id: cate_id,
      world_index: world_index
    })
    // console.log(cate_name)
  },

  onHide: function() {

  },

  onUnload: function() {
    // this.ifrealnameAuth();
  },

  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },

  //   that.uploadimg()
  //   console.log(that.uploadimg())
  // }　


  // 选择图片
  rel_img() {
    var that = this;
    var img_list = this.data.img_list;
    wx.chooseImage({
      count: img_list.length - 9, // 默认9 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function(res) {
        console.log(res)
        if (img_list.length >= 9) {
          wx.showToast({
            title: '最多上传9张图片',
            icon: 'none'
          })
          that.setData({
            showAdd: false
          })

        } else if (res.tempFiles[0].size > 512000) {
          wx.showToast({
            title: '图片过大',
            icon: 'none'
          })
        } else {
          that.setData({
            img_list: that.data.img_list.concat(res.tempFilePaths)
          });
          that.upload();
          that.setData({
            temp: that.data.img_list.length //用来解决 for 循环比 异步 快
          })
        }
      }
    })
  },
  //上传图片
  upload() {
    for (var i = this.data.temp; i < this.data.img_list.length; i++) {
      // console.log("000")
      this.upload_file(this.data.img_list[i])
    }
  },
  // // 确认上传图片
  upload_file(filepath) {
    var that = this;
    wx.uploadFile({
      url: util.base_img_url + 'index/api/uploadImage',
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: filepath,
      name: 'file',
      formData: {
        token: that.data.token
      },
      success: function(res) {
        console.log(res)
        var imgs = [];
        // imgs = imgs.concat(JSON.parse(res.data).data.path)
        that.setData({
          images: that.data.images.concat(JSON.parse(res.data).data.path) //把字符串解析成对象
          // images: imgs
        })
        console.log(that.data.images)
      },
      fail: function(res) {
        wx.showToast({
          title: '图片加载失败',
          icon: 'none'
        })
      }
    })
  },
  //点击删除图片
  delete_img: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.img_list.splice(index, 1)
    //渲染数据
    this.setData({
      img_list: this.data.img_list
    })
  },
  // 需求地点
  choose_address() {
    let that = this;
    wx.chooseLocation({
      success: (res) => {
        // console.log(res)
        that.setData({
          address: res.address,
          lat: res.latitude.toFixed(6),
          lon: res.longitude.toFixed(6)
        })
      }
    })
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
  }
})