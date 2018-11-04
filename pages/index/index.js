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
    adcode: '',
    show_mold: false,
    show_community: true,
    page: 1,
    page1: 1,
    perpage: 10,
    perpage1: 10,
    get_rlist: [],
    get_wlist: [],
    city_status: 0,
    county_status: 0,
    gender: '',
    gender1: ''
  },
  onLoad: function(options) {
    // console.log(options)
    this.slideShow();
    this.getcity();
    this.getcitylist();
    this.getWorldList();
  },
  onShow: function() {
    this.getcity();
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
            console.log(res_map);
            this.setData({
              city: res_map.result.ad_info.city,
              district: res_map.result.ad_info.district,
              adcode: res_map.result.ad_info.adcode,
              lat: latitude,
              lon: longitude,
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

    // this.setData({
    //   adcode: this.data.adcode.substring(3, -1)
    // })
    console.log(this.data.adcode)
    map.getDistrictByCityId({
      id: this.data.adcode, // 对应城市ID
      id: '120000',
      success: function(res) {
        // console.log(res);
      },

    });
  },
  // 选择条件
  choose() {
    if (this.data.show_mold == false) {
      wx.hideTabBar()
      this.setData({
        show_mold: true
      })

    } else {
      wx.showTabBar()
      this.setData({
        show_mold: false
      })
    }
  },
  // 隐藏筛选
  hidemold() {
    this.setData({
      show_mold: false
    })
    wx.showTabBar()
  },
  // 显示社群列表
  community() {
    this.setData({
      show_community: true
    })
    this.getcity();
  },
  // 显示世界列表
  world() {
    this.setData({
      show_community: false
    })
    this.getWorldList();
  },
  getcitylist() {
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'api/getCitylist',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            // console.log(res);
            if (res.data.code == 1) {

              wx.hideLoading();
            } else {
              console.log(res);
            }
          }
        })
      },
    })
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
            console.log(res);
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
    if (url) {
      wx.navigateTo({
        url: '../index/prize/prize',
      })
    } else {
      console.log(url);
    }
  }
})