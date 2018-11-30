// pages/my/my_resume/my_resume.js
var network = require("../../../utils/network.js");
Page({

  data: {
    myrelyList: [],
    selcetname: []
  },
  // 获取简历列表
  getResumeList() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'index/getResumeList',
          header: 'application/x-www - form - urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1) {
              var list = res.data.data
              for (var i in list) {
                list[i].check = false
              }
              that.setData({
                myrelyList: list
              })
              console.log(that.data.myrelyList)
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 选择简历
  choose_reItem(e) {
    let index = e.currentTarget.dataset.selectindex; //当前点击元素的自定义数据，这个很关键
    let myrelyList = this.data.myrelyList; //取到data里的selectIndex
    myrelyList[index].check = !myrelyList[index].check; //点击就赋相反的值
    this.setData({
      myrelyList: myrelyList //将已改变属性的json数组更新
    })

  },
  // 保存
  save_fun() {
    var selcetname = [];
    var myrelyList = this.data.myrelyList
    for (var j in myrelyList) {
      if (myrelyList[j].check == true) {
        selcetname.push(myrelyList[j].content)
      } else {
        selcetname.splice(j, 1);
      }
    }
    this.setData({
      selcetname: selcetname
    });
  
    wx.navigateTo({
      url: '../my_info/my_info?resume=' + this.data.selcetname.join(',')
    })
    console.log(this.data.selcetname)
  },
  onLoad: function(options) {
    this.getResumeList();
  },


  onReady: function() {

  },


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

})