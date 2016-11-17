//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isHideFooterLoading:true,
    record_recommed:[
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"巴赫: 6首大提琴无伴圣诞节放水淀粉当时发生的首都发生的…",
        subTitle:"BACH:Six Suites For Sol fdsf dsf fsdf dsfsd sdfsd…"
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
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item06",
        subTitle:"subTitle06"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item06",
        subTitle:"subTitle06"
      },
      {
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item06",
        subTitle:"subTitle06"
      },
    ],
    record_latest:[],
    tabSelect:[false,true],
    indicatorDots: true,
    autoplay: false,
    interval: 4000,
    duration: 1000,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  },
  //button recommend
  recommend_onclick:function(){
      this.setData({
        tabSelect:[false,true]
      })
  },
  //button latest
  latest_onclick:function(){
      this.setData({
        tabSelect:[true,false]
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
