//index.js



//获取应用实例
var app = getApp()
var timeUtil=require("../../utils/util.js")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
  },
  goList: function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
    // wx.chooseLocation({
    //   success: function(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.name
    //     var altitude = res.address
    //     that.setData({
    //       latitude: latitude,
    //       longitude: longitude,
    //       speed: speed,
    //       altitude: altitude,
    //     })
    //   },
    // })
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
          address: "laiguangying tiejianmarket F 308",
          name: "tiejian market",
        })
       
      }
    })

  },
  callme: function(){
    wx.makePhoneCall({
      phoneNumber: '15732633712',
    })
  },
  showmap: function(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.name,
      address: this.data.address,
      scale: 28
    })
  },
  onReady: function () {
    console.log("onready")
    this.mapCtx = wx.createMapContext('myMap')
    console.log(this);
    console.log(this.mapCtx)
  },
  huoquweizhi: function () {
    console.log("获取位置")
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  yidong: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  onShareAppMessage: function(res){
    wx.showShareMenu({
      withShareTicket: true
    })
    if(res.from === 'button'){
      //来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "快来看看今天走了几步吧",
      path: "/pages/index.wxml",
      success: function(res){
        console.log("转发成功");
      },
      fail: function(){
        console.log("转发失败");
      }
    }
  }
})
