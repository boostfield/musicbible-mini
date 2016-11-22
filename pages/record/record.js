//index.js
//获取应用实例
var app = getApp();
var api = require('../../backend/api.js')

var LP_RECOMMEND=1;
var LP_LATEST=2;
var lp_type=[LP_RECOMMEND,LP_LATEST];

Page({
  data: {
    currentType:lp_type[0],
    isHideFooterLoading:true,
    record_recommed:{
      index:1,
      pageSize:10,
      list:[
      {
        id:1,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"巴赫: 6首大提琴无伴圣诞节放水淀粉当时发生的首都发生的…",
        subTitle:"BACH:Six Suites For Sol fdsf dsf fsdf dsfsd sdfsd…"
      },
      {
         id:2,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item02",
        subTitle:"subTitle02"
      },
      {
         id:3,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item03",
        subTitle:"subTitle03"
      },
      {
        id:4,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item04",
        subTitle:"subTitle04"
      },
      {
        id:5,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item05",
        subTitle:"subTitle05"
      },
      {
        id:6,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item06",
        subTitle:"subTitle06"
      },
      {
        id:7,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item06",
        subTitle:"subTitle06"
      },
      {
        id:7,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item06",
        subTitle:"subTitle06"
      },
      {
        id:8,
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item06",
        subTitle:"subTitle06"
      },
    ]},
    record_latest:{
      index:1,
      pageSize:10,
      list:[]
      },
    tabSelect:[false,true],
  },
  onLoad: function () {
    console.log('onLoad')
    //获取推荐唱片列表
    this.reqRecommendData(this.renderRecommendData,false);
    //获取最新唱片列表
    this.reqLatestData(this.renderLatestData,false);
  },
  reqRecommendData:function(callback,isAdd){
      api.getRecommendReocrdList(null,{
        page:this.data.record_recommed.ndex,
        pageSize:this.data.record_recommed.pageSize
      },function(res){
          callback && callback.call(null,res.data,isAdd)
      },function(res){
          if(isAdd){
            console.log('上拉刷新完成');
            this.setData({
                 isHideFooterLoading:true
            });
          }else{
            console.log('下拉刷新完成')
            wx.stopPullDownRefresh()
          }
      })
  },
  reqLatestData:function(callback){
      api.getLatestRecordList(null,{
        page:this.data.record_latest.ndex,
        pageSize:this.data.record_latest.pageSize
      },function(res){
          callback && callback.call(null,res.data,isAdd)
      },function(res){
          if(isAdd){
            console.log('上拉刷新完成');
            this.setData({
                isHideFooterLoading:true
             });
          }else{
            console.log('下拉刷新完成')
            wx.stopPullDownRefresh()
          }
      })
  },
  renderRecommendData:function(res,isAdd){
    //渲染推荐唱片数据
    var recommendObj =this.data.record_recommed;
    var list = res.result.DataList;
    if(isAdd){
      list = recommendObj.list.concat(list);
    }
    recommendObj.list=list;
    this.setData({
      record_recommed:recommendObj
    })
  },
  renderLatestData:function(res,isAdd){
    //渲染最新唱片数据
    var latestObj =this.data.record_latest;
    var list = res.result.DataList;
    if(isAdd){
      list = latestObj.list.concat(list);
    }
    latestObj.list=list;
    this.setData({
      record_latest:latestObj
    })
  },
  //button recommend
  recommend_onclick:function(){
      this.setData({
        currentType:lp_type[0],
        tabSelect:[false,true]
      })
  },
  //button latest
  latest_onclick:function(){
      this.setData({
        currentType:lp_type[1],
        tabSelect:[true,false]
      })
  },
  //下拉刷新
  onPullDownRefresh:function(){
    console.log("xia la shua xin");
    setTimeout(this.onPullDownRefreshSuccess,2000);
  }, 
  //上拉刷新
  onReachBottom: function () {
    console.log("shang la shua xin");
    this.setData({
        isHideFooterLoading:false
    });
    if(this.data.currentType===lp_type[0]){
      var index = this.data.record_recommed.index;
      this.data.record_recommed.index =++index;
      this.reqRecommendData(this.renderRecommendData,true);
    }else{
      var index = this.data.record_latest.index;
      this.data.record_latest.index =++index;
      this.reqRecommendData(this.renderRecommendData,true);
    }
    //延迟加载
    //setTimeout(this.onBottomRefreshSucess,2000);
  },
})
