//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isHideFooterLoading:true,
    record_lp:[
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item01",
        subTitle:"subTitle01"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item02",
        subTitle:"subTitle02"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item03",
        subTitle:"subTitle03"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item04",
        subTitle:"subTitle04"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item05",
        subTitle:"subTitle05"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item06",
        subTitle:"subTitle06"
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onPullDownRefresh:function(){
    console.log("xia la shua xin");
    setTimeout(this.onPullDownRefreshSuccess,2000);
  }, 
  onReachBottom: function () {
    console.log("shang la shua xin");
    this.setData({
        isHideFooterLoading:false
    });
    //延迟加载
    setTimeout(this.onBottomRefreshSucess,2000);
  },
  onPullDownRefreshSuccess:function(){
    wx.stopPullDownRefresh();
  },
  onBottomRefreshSucess:function(){
    console.log("wft");
    this.setData({
        isHideFooterLoading:true
    });
  }

})
