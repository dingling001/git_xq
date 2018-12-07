import qqmap from '../../../utils/map.js'; //这里的路径看你自己的文件路径
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var map = new QQMapWX({
  key: 'HO7BZ-IT23U-LOWVU-2JSJY-BS5ET-PLBDR' // 必填
});
Page({
  data: {
    //下面是字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    cityListId: '',
    //下面是城市列表信息，这里只是模拟数据
    citylist: [{
      "letter": "A",
      "data": [{
        "id": "v7",
        "cityName": "安徽"
      }]
    }, {
      "letter": "B",
      "data": [{
        "id": "v10",
        "cityName": "巴中"
      }, {
        "id": "v4",
        "cityName": "包头"
      }, {
        "id": "v1",
        "cityName": "北京"
      }]
    }, {
      "letter": "C",
      "data": [{
        "id": "v15",
        "cityName": "成都"
      }]
    }, {
      "letter": "D",
      "data": [{
        "id": "v21",
        "cityName": "稻城"
      }]
    }, {
      "letter": "G",
      "data": [{
        "id": "v17",
        "cityName": "广州"
      }, {
        "id": "v29",
        "cityName": "桂林"
      }]
    }, {
      "letter": "H",
      "data": [{
        "id": "v9",
        "cityName": "海南"
      }, {
        "id": "v3",
        "cityName": "呼和浩特"
      }]
    }, {
      "letter": "L",
      "data": [{
        "id": "v24",
        "cityName": "洛阳"
      }, {
        "id": "v20",
        "cityName": "拉萨"
      }, {
        "id": "v14",
        "cityName": "丽江"
      }]
    }, {
      "letter": "M",
      "data": [{
        "id": "v13",
        "cityName": "眉山"
      }]
    }, {
      "letter": "N",
      "data": [{
        "id": "v27",
        "cityName": "南京"
      }]
    }, {
      "letter": "S",
      "data": [{
        "id": "v18",
        "cityName": "三亚"
      }, {
        "id": "v2",
        "cityName": "上海"
      }]
    }, {
      "letter": "T",
      "data": [{
        "id": "v5",
        "cityName": "天津"
      }]
    }, {
      "letter": "W",
      "data": [{
        "id": "v12",
        "cityName": "乌鲁木齐"
      }, {
        "id": "v25",
        "cityName": "武汉"
      }]
    }, {
      "letter": "X",
      "data": [{
        "id": "v23",
        "cityName": "西安"
      }, {
        "id": "v28",
        "cityName": "香港"
      }, {
        "id": "v19",
        "cityName": "厦门"
      }]
    }, {
      "letter": "Z",
      "data": [{
        "id": "v8",
        "cityName": "张家口"
      }]
    }],
    //下面是热门城市数据，模拟数据
    newcity: ['北京', '上海', '广州', '深圳', '成都', '杭州'],
    citySel: '全国',
    locateCity: ''
  },

  //点击城市
  cityTap(e) {
    console.log(e)
    const val = e.currentTarget.dataset.val || '',
      types = e.currentTarget.dataset.types || '',
      Index = e.currentTarget.dataset.index || '',
      that = this;
    let city = this.data.citySel;

    console.log(val)

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
      console.log(val);
      if (val.indexOf('市') !== -1) { //这里是去掉“市”这个字
        console.log(val.indexOf('市') - 1);
        val = val.slice(0, val.indexOf('市'));
        console.log(val);
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
    map.getCityList({
      success: function(res) {
        console.log(res);
        var citys = [];
        var city_a = {
          "letter": "A",
          "data": []
        };
        var city_b = [];
        var data = res.result[0];
        for (var i in data) {
          // if()
          citys.push({
            "letter": data[i].pinyin[0].substring(0, 1).toUpperCase(),
            "data": [{
              "id": data[i].id,
              "cityName": data[i].name,
              "lat": data[i].location.lat,
              "lon": data[i].location.lng
            }]
          })
          if (data[i].letter == 'A') {
            console.log(citys[i])
            var a = citys[i].data
            for (var ai in a) {

              console.log(ai)
              city_a.data.push({
                "id": a[ai].id,
                "cityName": a[a].cityName,
                "lat": a[ai].location.lat,
                "lon": a[ai].location.lng
              })
            }
          } else if (citys[i].letter == 'B') {
            city_b.push({
              "letter": data[i].pinyin[0].substring(0, 1).toUpperCase(),
              "data": [{
                "id": data[i].id,
                "cityName": data[i].name,
                "lat": data[i].location.lat,
                "lon": data[i].location.lng
              }]
            })
          }
          // citys = res.result[0].sort()
        }
        citys = citys.concat(city_a).concat(city_b)
        console.log(city_a)
        that.setData({
          citylist: citys
        })
        console.log(citys);
        // citys = res.result[0].letter.sort()
      },
    });

  },
  onLoad: function() {
    this.getCityList()
  }
})