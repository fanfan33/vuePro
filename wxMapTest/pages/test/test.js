// pages/test/test.js
var util = require('../../utils/util.js')

// Page({
//   data: {
//     date: util.formatTime(new Date(Date.now())),
//     inputValue:""
//   },
//   canvasIdErrorCallback: function (e) {
//     console.error(e.detail.errMsg)
//   },
//   bindDateChange: function(e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       date: e.detail.value
//     })
//   },
//   inSys: function(e){
//     inputValue=e.detail
//   },
  
//   getMsg: function(){
//     wx.request({
//       url: 'https://api.douban.com/v2/movie/top250',
//       header: {
//         'Content-Type': 'application/json'
//       },
//       success: function(res){
//         console.log(res)
//       },
//       fail: function(){
//         console.log("接口调用失败咯")
//       }
//     })
//   }
// })

Page({
  data: {
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function (e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})
