//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    infoArr: []
  },
  onLoad: function () {
    wx.setNavigationBarTitle({title: "排行榜"});
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6000',
    })
    var listArr = [
      { advUrl: "junyong04.jpg", name: "张三", step: "12347" }, 
      { advUrl: "junyong05.jpg", name: "李四", step: "12346" },
      { advUrl: "junyong06.jpg", name: "王五", step: "12345" },
      { advUrl: "junyong07.jpg", name: "赵六", step: "12344" },
      { advUrl: "junyong08.jpg", name: "七七", step: "12343" },
      { advUrl: "junyong05.jpg", name: "李四", step: "12346" },
      { advUrl: "junyong06.jpg", name: "王五", step: "12345" },
      { advUrl: "junyong07.jpg", name: "赵六", step: "12344" },
      { advUrl: "junyong08.jpg", name: "七七", step: "12343" },
      { advUrl: "junyong08.jpg", name: "八八", step: "12342" }
    ]
    this.setData({
      infoArr: listArr
    })
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(function (log) {
    //     return util.formatTime(new Date(log)) 
    //   })
    // })
  },
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      //来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "步数排行榜",
      path: "/pages/logs.wxml",
      success: function (res) {
        console.log("转发成功");
      },
      fail: function () {
        console.log("转发失败");
      }
    }
  }
})
