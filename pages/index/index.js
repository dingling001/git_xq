//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var network = require("../../utils/network.js");
var qqmapsdk;
var map = new QQMapWX({
  key: 'HO7BZ-IT23U-LOWVU-2JSJY-BS5ET-PLBDR' // 必填
});
Page({
  data: {
    slide_list: [],
    city: '',
    district: '',
    lat: '',
    lon: '',
    city_code: '',
    show_mold: false,
    show_community: true,
    showscreen: false,
    showchoose: false,
    page: 1,
    page1: 1,
    perpage: 10,
    perpage1: 10,
    get_rlist: [],
    get_wlist: [],
    city_status: 0,
    county_status: 0,
    gender: '',
    gender1: '',
    district_list: [],
    down_list: [],
    fujin: true,
    selected_index: -1,
    all_index: -1,
    all: true,
    fujinlist: []
  },
  onLoad: function(options) {
    this.slideShow();
    // this.getcitylist();
    this.getWorldList();
    console.log(app.globalData)

  },
  onShow: function() {
    var lat = app.globalData.lat;
    var lon = app.globalData.lon;
    if (lat && lon) {
      map.reverseGeocoder({
        location: {
          latitude: lat,
          longitude:lon
        },
        success: (res_map) => {
          console.log(res_map);
          var fujinlist = [res_map.result.ad_info]
          // console.log(fujinlist)
          this.setData({
            city: res_map.result.ad_info.city.slice(0, res_map.result.ad_info.city.indexOf('市')),
            district: res_map.result.ad_info.district,
            city_code: res_map.result.ad_info.city_code,
            lat: lat,
            lon: lon,
            down_list: fujinlist,
            fujinlist: fujinlist,
          })
          this.getdistrict();
          this.getRlist();
        },
      });
    } else {
      this.getcity();
    }
    wx.showTabBar()
  },
  // 获取首页轮播图
  slideShow() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/slideShow',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            var slidelist = res.data.data;
            if (res.data.code == 1) {
              for (var i in slidelist) {
                slidelist[i].pic = util.base_img_url + slidelist[i].pic
              }
              that.setData({
                slide_list: slidelist
              })
              // console.log(that.data.slide_list);
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 获取当前城市定位
  getcity() {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        map.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: (res_map) => {
            // console.log(res_map);
            var fujinlist = [res_map.result.ad_info]
            // console.log(fujinlist)
            this.setData({
              city: res_map.result.ad_info.city.slice(0, res_map.result.ad_info.city.indexOf('市')),
              district: res_map.result.ad_info.district,
              city_code: res_map.result.ad_info.city_code,
              lat: latitude,
              lon: longitude,
              down_list: fujinlist,
              fujinlist: fujinlist,
            })
            this.getdistrict();
            this.getRlist();
          },
        });
      },
      fail: (erro) => {
        wx.showModal({
          title: '授权地理位置',
          content: '为了能正常使用小程序，请授权地理位置信息',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#333',
          success: (res) => {
            wx.openSetting({
              success: (res_open) => {
                console.log(res_open)
                this.getcity();
                this.getRlist();
              }
            })
          },
        })
      }
    });
  },
  // 获取城市的城镇
  getdistrict() {
    var that = this;
    this.setData({
      city_code: this.data.city_code.substring(this.data.city_code.length - 6, this.data.city_code.length)
    })
    // console.log(this.data.city_code)
    map.getDistrictByCityId({
      id: this.data.city_code, // 对应城市ID
      // id: "120000",
      success: function(res) {
        that.setData({
          district_list: res.result[0]
        })
      },
    });

  },
  // 选择镇级列表
  getdowntown(e) {
    var that = this;
    var id = e.currentTarget.dataset.code;
    var index = e.currentTarget.dataset.index;
    map.getDistrictByCityId({
      // id: this.data.adcode, // 对应城市ID
      id: id,
      success: function(res) {
        // console.log(res)
        that.setData({
          down_list: res.result[0],
          fujin: false,
          selected_index: index,
          all_index: -1,
          all: true
        })
      },
    });
  },
  // 附近
  fujin_fun() {
    var fujinlist = this.data.fujinlist;
    // console.log(fujinlist)
    this.setData({
      fujin: true,
      selected_index: -1,
      down_list: fujinlist
    })
  },
  // 全部选择
  all_fun(e) {
    var index = e.currentTarget.dataset.index;
    var lat = e.currentTarget.dataset.lat;
    var lon = e.currentTarget.dataset.lon;
    var fullname = e.currentTarget.dataset.fullname
    this.setData({
      all_index: index,
      lat: lat,
      lon: lon,
      all: false,
      show_mold: false,
      district: fullname,
      showchoose: false
    })
    this.getRlist();
  },
  // 全部
  all_index_fun() {
    this.setData({
      all: true,
      all_index: -1,
    })
  },
  // 选择条件
  choose() {
    if (this.data.show_mold == false) {
      wx.hideTabBar()
      this.setData({
        show_mold: true,
        showscreen: false,
        showchoose: true
      })

    } else {
      wx.showTabBar()
      this.setData({
        show_mold: false,
        showscreen: false,
        showchoose: false
      })
    }
  },
  // 隐藏筛选
  hidemold() {
    this.setData({
      show_mold: false,
      showscreen: false,
      showchoose: false
    })
    wx.showTabBar()
  },
  // 显示社群列表
  community() {
    this.setData({
      show_community: true,
      show_mold: false
    })
    // this.getcity();
    this.getRlist();
  },
  // 显示世界列表
  world() {
    this.setData({
      show_community: false,
      show_mold: false
    })
    this.getWorldList();
  },

  // 获取社区列表
  getRlist() {
    var that = this;
    that.setData({
      city_status: 1,
      county_status: 1
    })
    wx.showLoading({
      title: '正在加载',
    })
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getRlist',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            page: that.data.page,
            perpage: that.data.perpage,
            city: that.data.city_status,
            county: that.data.county_status,
            lon: that.data.lon,
            lat: that.data.lat,
            gender: that.data.gender,
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {
              var list = res.data.data.list;
              for (var i in list) {
                list[i].create_time = util.formatDate(new Date(list[i].create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
                list[i].juli = parseFloat(list[i].juli).toFixed(2)
              }
              that.setData({
                get_rlist: list
              })
              wx.hideLoading()
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 获取世界列表
  getWorldList() {
    var that = this;
    that.setData({
      city_status: 0,
      county_status: 0,
    })
    wx.showLoading({
      title: '正在加载',
    })
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getWorldRlist',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
            page: that.data.page1,
            perpage: that.data.perpage1,
            gender: that.data.gender1,
            city: that.data.city_status,
            county: that.data.county_status,
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {
              var list = res.data.data.list;
              for (var i in list) {
                list[i].create_time = util.formatDate(new Date(list[i].create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
                list[i].juli = parseFloat(list[i].juli).toFixed(2)
              }
              that.setData({
                get_wlist: list
              })
              wx.hideLoading()
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 跳转抽奖
  go_prize(e) {
    console.log(e)
    var url = e.currentTarget.dataset.url;
    var pic = e.currentTarget.dataset.pic;
    if (url) {
      wx.navigateTo({
        url: '../index/prize/prize?pic=' + pic,
      })
    } else {
      console.log(url);
    }
  },
  // 筛选
  screen() {
    if (this.data.showscreen == false) {
      wx.hideTabBar()
      this.setData({
        showscreen: true,
        show_mold: true,
        showchoose: false
      })
    } else {
      wx.showTabBar()
      this.setData({
        show_mold: false,
        showscreen: false,
        showchoose: false
      })
    }
  },
  // 跳转应邀详情
  apply_fun(e) {
    var order_sn = e.currentTarget.dataset.order_sn;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './invited/invited?order_sn=' + order_sn + '&rid=' + id,
    })
  },


  // 分享
  onShareAppMessage: function(options) {
    // console.log(options)　
    // 来自页面内的按钮的转发
    if (options.from == 'button') {　　　　
      var that = this;
      var item = options.target.dataset.item;
      // console.log(util.base_img_url + item.image.split('"')[1])
      var shareObj = {
        title: item.title,
        desc: item.content,
        path: '/pages/start/start?order_sn=' + item.order_sn,
        imageUrl: util.base_img_url + item.image.split('"')[1] ? util.base_img_url + item.image.split('"')[1] : '',
        success: function(res) {
          if (res.errMsg == 'shareAppMessage:ok') {
            wx.showToast({
              title: '分享成功',
            })
          }
        },
        fail: function() {
          if (res.errMsg == 'shareAppMessage:fail cancel') {
            wx.showToast({
              title: '取消分享',
              icon: 'none'
            })
          } else if (res.errMsg == 'shareAppMessage:fail') {
            wx.showToast({
              title: '稍后再试',
              icon: 'none'
            })
          }
        },
      };　
      return shareObj;
    } else {
      return {
        title: '近帮社区',
        desc: '需求无限，一呼百应',
        path: '/pages/start/start',
      }
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      get_rlist: [],
      get_wlist: [],
    })
    this.getRlist();
    this.getWorldList();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },
})