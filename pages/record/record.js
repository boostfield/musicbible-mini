//index.js
//获取应用实例
var app = getApp();
var api = require('../../backend/api.js');
var imageHelper = require('../../utils/imageHelper.js');

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
      list:[]
      },
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
    this.reqRecommendData(this.renderRecommendData,false,this);
    //获取最新唱片列表
    this.reqLatestData(this.renderLatestData,false,this);
  },
  reqRecommendData:function(callback,isAdd,currentPage){
      if(isAdd){
        var index = currentPage.data.record_recommed.index+1;
      }else{
        var index=1;
      }
      api.getRecommendReocrdList(null,{
        page:index,
        pageSize:this.data.record_recommed.pageSize
      },function(res){
          if(isAdd){
             if(res.data.result.DataList.length>0){
              currentPage.data.record_recommed.index =index;
            }
            console.log('上拉刷新完成');
            currentPage.setData({
                 isHideFooterLoading:true
            });
          }else{
            console.log('下拉刷新完成')
            wx.stopPullDownRefresh()
          }
        console.log(res);
        callback && callback.call(null,res.data,isAdd)
      },function(res){
          if(isAdd){
            console.log('上拉刷新出现问题');
            currentPage.setData({
                 isHideFooterLoading:true
            });
          }else{
            console.log('下拉刷新出现问题')
            wx.stopPullDownRefresh()
          }
      })
  },
  reqLatestData:function(callback,isAdd,currentPage){
     if(isAdd){
        var index = currentPage.data.record_latest.index+1;
      }else{
        var index=1;
      }
      console.log("最新的index  "+index);
      api.getLatestRecordList(null,{
        page:index,
        pageSize:this.data.record_latest.pageSize
      },function(res){
          if(isAdd){
            if(res.data.result.DataList.length>0){
              currentPage.data.record_latest.index =index;
            }
            console.log('上拉刷新完成');
            currentPage.setData({
                 isHideFooterLoading:true
            });
          }else{
            console.log('下拉刷新完成')
            wx.stopPullDownRefresh()
          }
        console.log(res);
        callback && callback.call(null,res.data,isAdd)
      },function(res){
          if(isAdd){
            console.log('上拉刷新出现问题');
            currentPage.setData({
                 isHideFooterLoading:true
            });
          }else{
            console.log('下拉刷新出现问题')
            wx.stopPullDownRefresh()
          }
      })
  },
  renderRecommendData:function(res,isAdd){
    //渲染推荐唱片数据
    var recommendObj =this.data.record_recommed;
    var list = res.result.DataList;
    for (var i=0;i<list.length;i++)
    {
      //唱片图片
      list[i].AppCoverUrl=imageHelper.imageUrlDispatcher(list[i].AppCoverUrl,imageHelper.DISKCOVER);
    }
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
    for (var i=0;i<list.length;i++)
    {
      //唱片图片
      list[i].AppCoverUrl=imageHelper.imageUrlDispatcher(list[i].AppCoverUrl,imageHelper.DISKCOVER);
    }
    
    if(isAdd){
      list = latestObj.list.concat(list);
    }
    latestObj.list=list;
    this.setData({
      record_latest:latestObj
    })
  },
  //推荐按钮 点击
  recommend_onclick:function(){
      this.setData({
        currentType:lp_type[0],
        tabSelect:[false,true]
      })
  },
  //最新按钮 点击
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
    console.log("触发上拉刷新");
    this.setData({
        isHideFooterLoading:false
    });
    if(this.data.currentType===lp_type[0]){
      this.reqRecommendData(this.renderRecommendData,true,this);
    }else{
      this.reqLatestData(this.renderLatestData,true,this);
    }
    //延迟加载
    //setTimeout(this.onBottomRefreshSucess,2000);
  },
})
