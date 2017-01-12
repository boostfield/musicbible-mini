//app.js
App({
  pixelRatio:2,
  onLaunch: function () {
    //小程序初始化
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getDeviceInfo();
  },
  onShow:function(){
    //小程序显示
  },
  onHide:function(){
    //小程序隐藏
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    pixelRatio:2,
    windowWidth:375,
    Host:'https://preview.musicbible.com/api/v1',
    HostV1_1:'https://preview.musicbible.com/api/v1.1',
    userInfo:null
  },
  getDeviceInfo:function(){
    //获取设备信息
      try {
        var res = wx.getSystemInfoSync()
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        this.globalData.pixelRatio=res.pixelRatio;
        this.globalData.windowWidth=res.windowWidth;
      } catch (e) {
        // Do something when catch error
      } 
  }
})


