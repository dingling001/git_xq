import qqmap from '../../../utils/map.js'; //这里的路径看你自己的文件路径
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var map = new QQMapWX({
  key: 'HO7BZ-IT23U-LOWVU-2JSJY-BS5ET-PLBDR' // 必填
});
const app = getApp();
Page({
  data: {
    //下面是字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    cityListId: '',
    citylist: [],
    locateCity: ''
  },

  //点击城市
  cityTap(e) {

    const val = e.currentTarget.dataset.val || '',
      lat = e.currentTarget.dataset.lat || '',
      lon = e.currentTarget.dataset.lon || '',
      that = this;
    wx.switchTab({
      url: '../index',
    });
    app.globalData.lat = lat;
    app.globalData.lon = lon;

  },
  //点击城市字母
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      cityListId: Item
    });
    // console.log("..............." + this.data.cityListId);
  },
  //调用定位
  getLocate() {
    let that = this;
    new qqmap().getLocateInfo().then(function(val) { //这个方法在另一个文件里，下面有贴出代码
      // console.log(val);
      if (val.indexOf('市') !== -1) { //这里是去掉“市”这个字
        // console.log(val.indexOf('市') - 1);
        val = val.slice(0, val.indexOf('市'));
        // console.log(val);
      }
      that.setData({
        locateCity: val
      });
      //把获取的定位和获取的时间放到本地存储
      wx.setStorageSync('locatecity', {
        city: val,
        time: new Date().getTime()
      });
    });
  },

  onShow() {
    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';
    if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) { //每隔30分钟请求一次定位
      this.getLocate();
    } else { //如果未满30分钟，那么直接从本地缓存里取值
      that.setData({
        locateCity: cityOrTime.city
      })
    }
  },
  getCityList() {
    var that = this
    wx.showLoading({
      title: '数据加载……',
    })
    map.getCityList({
      success: function(res) {
        // console.log(res);
        var citys = [];
        var city_a = {
            "letter": "A",
            "data": []
          },
          city_b = {
            "letter": "B",
            "data": []
          },
          city_c = {
            "letter": "C",
            "data": []
          },
          city_d = {
            "letter": "D",
            "data": []
          },
          city_e = {
            "letter": "E",
            "data": []
          },
          city_f = {
            "letter": "F",
            "data": []
          },
          city_g = {
            "letter": "G",
            "data": []
          },
          city_h = {
            "letter": "H",
            "data": []
          },
          city_i = {
            "letter": "I",
            "data": []
          },
          city_j = {
            "letter": "J",
            "data": []
          },
          city_k = {
            "letter": "K",
            "data": []
          },
          city_l = {
            "letter": "L",
            "data": []
          },
          city_m = {
            "letter": "M",
            "data": []
          },
          city_n = {
            "letter": "N",
            "data": []
          },
          city_o = {
            "letter": "O",
            "data": []
          },
          city_p = {
            "letter": "P",
            "data": []
          },
          city_q = {
            "letter": "Q",
            "data": []
          },
          city_r = {
            "letter": "R",
            "data": []
          },
          city_s = {
            "letter": "S",
            "data": []
          },
          city_t = {
            "letter": "T",
            "data": []
          },
          city_u = {
            "letter": "U",
            "data": []
          },
          city_v = {
            "letter": "V",
            "data": []
          },
          city_w = {
            "letter": "W",
            "data": []
          },
          city_x = {
            "letter": "X",
            "data": []
          },
          city_y = {
            "letter": "Y",
            "data": []
          },
          city_z = {
            "letter": "Z",
            "data": []
          };
        var data = res.result[1];
        for (var i in data) {
          citys.push({
            "letter": data[i].pinyin[0].substring(0, 1).toUpperCase(),
            "data": [{
              "id": data[i].id,
              "cityName": data[i].name,
              "lat": data[i].location.lat,
              "lon": data[i].location.lng
            }]
          })
          if (citys[i].letter == 'A') {
            var a = citys[i].data[0]
            city_a.data.push(a)
          } else if (citys[i].letter == 'B') {
            var a = citys[i].data[0]
            city_b.data.push(a)
          } else if (citys[i].letter == 'C') {
            var a = citys[i].data[0]
            city_c.data.push(a)
          } else if (citys[i].letter == 'D') {
            var a = citys[i].data[0]
            city_d.data.push(a)
          } else if (citys[i].letter == 'E') {
            var a = citys[i].data[0]
            city_e.data.push(a)
          } else if (citys[i].letter == 'F') {
            var a = citys[i].data[0]
            city_f.data.push(a)
          } else if (citys[i].letter == 'G') {
            var a = citys[i].data[0]
            city_g.data.push(a)
          } else if (citys[i].letter == 'H') {
            var a = citys[i].data[0]
            city_h.data.push(a)
          } else if (citys[i].letter == 'I') {
            var a = citys[i].data[0]
            city_i.data.push(a)
          } else if (citys[i].letter == 'J') {
            var a = citys[i].data[0]
            city_j.data.push(a)
          } else if (citys[i].letter == 'K') {
            var a = citys[i].data[0]
            city_k.data.push(a)
          } else if (citys[i].letter == 'L') {
            var a = citys[i].data[0]
            city_l.data.push(a)
          } else if (citys[i].letter == 'M') {
            var a = citys[i].data[0]
            city_m.data.push(a)
          } else if (citys[i].letter == 'N') {
            var a = citys[i].data[0]
            city_n.data.push(a)
          } else if (citys[i].letter == 'O') {
            var a = citys[i].data[0]
            city_o.data.push(a)
          } else if (citys[i].letter == 'P') {
            var a = citys[i].data[0]
            city_p.data.push(a)
          } else if (citys[i].letter == 'Q') {
            var a = citys[i].data[0]
            city_q.data.push(a)
          } else if (citys[i].letter == 'R') {
            var a = citys[i].data[0]
            city_r.data.push(a)
          } else if (citys[i].letter == 'S') {
            var a = citys[i].data[0]
            city_s.data.push(a)
          } else if (citys[i].letter == 'T') {
            var a = citys[i].data[0]
            city_t.data.push(a)
          } else if (citys[i].letter == 'U') {
            var a = citys[i].data[0]
            city_u.data.push(a)
          } else if (citys[i].letter == 'V') {
            var a = citys[i].data[0]
            city_v.data.push(a)
          } else if (citys[i].letter == 'W') {
            var a = citys[i].data[0]
            city_w.data.push(a)
          } else if (citys[i].letter == 'X') {
            var a = citys[i].data[0]
            city_x.data.push(a)
          } else if (citys[i].letter == 'Y') {
            var a = citys[i].data[0]
            city_y.data.push(a)
          } else if (citys[i].letter == 'Z') {
            var a = citys[i].data[0]
            city_z.data.push(a)
          }
          // citys = res.result[0].sort()
        }
        citys = [];
        citys = citys.concat(city_a).concat(city_b).concat(city_c).concat(city_d).concat(city_e).concat(city_f).concat(city_g).concat(city_h).concat(city_i).concat(city_j).concat(city_k).concat(city_l).concat(city_m).concat(city_n).concat(city_o).concat(city_p).concat(city_q).concat(city_r).concat(city_s).concat(city_t).concat(city_u).concat(city_v).concat(city_w).concat(city_x).concat(city_y).concat(city_z)
        that.setData({
          citylist: citys
        })
        wx.hideLoading()
        // console.log(citys);
      },
    });

  },
  onLoad: function() {
    this.getCityList()
  }
})