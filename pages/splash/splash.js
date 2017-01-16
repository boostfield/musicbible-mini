// pages/splash/splash.js
Page({
 data:{},
 onLoad:function(options){
 // 页面初始化 options为页面跳转所带来的参数
 var that = getApp()
  if(true){
      wx.switchTab({
      url: '../record/record',
    })
    return;
  }

  try {
  //首先检查缓存中是否有我们需要请求的数据，如果没有，我们再跟服务器连接，获取数据
  //首次登陆肯定是没有的
  that.globalData.userInfo = wx.getStorageSync('userInfo')
  if(wx.getStorageSync('userInfo')!=''){
  //如果缓存不为空，即已经存在数据，我们不用再跟服务器交互了，那么直接跳转到首页
  wx.switchTab({
  url: '../record/record',
  })
  }
  if (value) {
  // Do something with return value
  console.log(that.globalData.userInfo)
  }
 } catch(e){
  // Do something when catch error
  //当try中的缓存数据不存在时，将跳到这步，这步中，我们将与服务器进行连接，并获取数据
  if(that.globalData.userInfo == ''){
  wx.login({
   success: function(res) {
   //获取用户code，转发到我们的服务器，再在我们服务器与微信交互，获取openid
    var code = res.code
    wx.getUserInfo({
     success: function(userInfo) {
      var encryptedData = userInfo.encryptedData
      var iv = userInfo.iv
      //我们服务器请求地址
      var url = that.apiHost + 'index/login'
      var userinfo = userInfo.userInfo
      var username = userinfo.nickName
      var useravatar =userinfo.avatarUrl
      var usersex=userinfo.gender
      wx.request({
       url: url,
       method: 'POST',
       data: {
        'code': code,
        'username':username,
        'useravatar':useravatar,
        'usersex':usersex
       },
       header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
    success:function(response) {
    //数据交互成功后，我们将服务器返回的数据写入全局变量与缓存中
    console.log(response.data)
    //写入全局变量
    that.globalData.userInfo = response.data
    wx.hideToast()
    //写入缓存
    wx.setStorage({
    key: 'userInfo',
    data: that.globalData.userInfo,
    success: function(res){
      console.log("insert success")
     },
    fail: function() {
     // fail
     },
    complete: function() {
     // complete
     }
     })
   //写入后，我们将跳转到主页
   wx.switchTab({
    url: '../record/record',
    })
   },
  failure: function(error) {
    console.log(error)
       },
      })
     }
    })
   }
  })}
 } 
 },
 onReady:function(){
 // 页面渲染完成
 },
 onShow:function(){
 // 页面显示
 },
 onHide:function(){
 // 页面隐藏
 },
 onUnload:function(){
 // 页面关闭
 },
 redirect:function(){
 wx.switchTab({
  url: '../index/index',
 })
 }
})