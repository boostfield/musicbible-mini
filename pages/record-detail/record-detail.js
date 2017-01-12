var app = getApp()
var api = require('../../backend/api.js');
var imageHelper = require('../../utils/imageHelper.js');
var utils = require('../../utils/util.js');
var audioHelper = require('../../utils/audioHelper.js');

var staticIndex=0;
Page({
    data:{
      currentIndex:0,
      record:{},
      scrollLeft:1,
      checkItem:false,
      previewCoverUrl:"",
      isHidePreivew:true,
      isMusicPlaying:false,
      MusicPlayingIndex:-1
    },
  scroll: function(e) {
    var pixelRatio=app.globalData.pixelRatio;
    var windowWidth=app.globalData.windowWidth;
    var realDistance = (windowWidth/750)*470;
    var scrollLeft=e.detail.scrollLeft
    var scrollWidth= e.detail.scrollWidth;
    console.log("realDistance  "+realDistance);
    console.log("scrollWidth  "+scrollWidth);
    console.log("scrollLeft  "+e.detail.scrollLeft);
    var currentList= this.data.record.Images;
    if(!this.data.checkItem){
       for(var i=0;i<currentList.length;i++){
        currentList[i].position=i*realDistance;
      }
      this.setData({
        checkItem:true
      })
    }
    //开始处理 找出谁是current
    for(var i=0;i<currentList.length;i++){
      var postion=currentList[i].position;
      if(scrollLeft==0){
        index=0;
        this.clearAllindex(currentList);
        if(currentList.length!=0){
            currentList[index].selected="selected";
        }
        this.setData({
            record:this.data.record,
            currentIndex:index
        })
        return;
      }else if(scrollLeft<postion){
        //console.log("postion "+postion+" scrollLeft  "+scrollLeft);
        var index = i-1;
        //console.log("index "+index);
        this.clearAllindex(currentList);
        currentList[index].selected="selected";
         this.setData({
            //scrollLeft:(this.data.record.Images[index].position)+1,
            record:this.data.record,
            currentIndex:index
        })
        return;
      }else if(scrollLeft==scrollWidth-windowWidth){
        //console.log("postion "+postion+" scrollLeft  "+scrollLeft);
        var index =currentList.length-1;
        //console.log("index "+index);
        this.clearAllindex(currentList);
        currentList[index].selected="selected";
         this.setData({
            //scrollLeft:(this.data.record.Images[index].position)+1,
            record:this.data.record,
            currentIndex:index
        })
        return;
      }   
    }  
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.data.record.id = options.id;
    this.setData({
      record: this.data.record
    })

    this.reqRecordDetailData(this.renderRecordDetailData);
  },
  onReady:function(){
    // 页面渲染完成
    //让所有cover能刷新position
    this.setData({
      scrollLeft:this.data.scrollLeft+1
    })
    this.setMusicLister();
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
    wx.stopBackgroundAudio();
  },
  actionImagePreview:function(e){
    //图片预览
    var cover=e.currentTarget.dataset.cover;
    this.setData({
      previewCoverUrl:cover,
      isHidePreivew:false
    })
  },
  closePreview:function(){
    //关闭图片预览
    this.setData({
      isHidePreivew:true,
      scrollLeft:(this.data.record.Images[staticIndex].position)+1
    })
  },
  clearAllindex:function(currentList){
      for(var i=0;i<currentList.length;i++){
          currentList[i].selected="";
      }
  },
  manageScrollResult:function(index){
    var currentList= this.data.tracklist;
  },
  reqRecordDetailData:function(callback){
    //请求唱片详情数据
      api.getRecordDetail(null,{
        id:this.data.record.id
      },function(res){
        console.log(res);
        callback && callback.call(null,res.data)
      },function(res){

      })
  },
  renderRecordDetailData:function(data){
    //渲染唱片详情数据
    var recordObj=data.result;
    //唱片图片
    recordObj.AppCoverUrl=imageHelper.imageUrlDispatcher(recordObj.AppCoverUrl,imageHelper.ORIGIN);
    //唱片简介的去空格
    recordObj.InfoSections[1].Text=utils.trim(recordObj.InfoSections[1].Text);
    //唱片封面图片列表【需要构造一下】
    for (var i=0;i<recordObj.Images.length;i++)
    {
      var coverObj =new Object();
      if(i===0){
        //初始化小数点
        coverObj.selected="selected";
      }else{
        coverObj.selected="";
      }
      coverObj.position=-1;
      coverObj.imageCoverUrl=imageHelper.imageUrlDispatcher(recordObj.Images[i],imageHelper.ORIGIN);
      //唱片图片
      recordObj.Images[i]=coverObj;
    }
    for(var i=0;i<recordObj.Audios.length;i++){
        var item = recordObj.Audios[i];
        item.selected="";
        item.index=i;
        item.isMusicPlaying=false;
    }
    this.setData({
      record:recordObj
    })
  },
  onCurrentPageSelected:function(e){
    var index = e.detail.current;
    console.log("~~~~");
    console.log(index);
    staticIndex=index;
    // this.setData({
    //   scrollLeft:this.data.record.Images[index].position
    // })
  },
  //播放音乐
  actionPlayMusic:function(e){
    var page = this;
    var index =e.currentTarget.dataset.index;
    var audios = this.data.record.Audios;
    var item = audios[index];
    if(this.data.MusicPlayingIndex==index&&this.data.isMusicPlaying){
        item.isMusicPlaying=false;
        this.setData({
          record:this.data.record,
        })
        this.changeMusicStatus(false);
        wx.pauseBackgroundAudio();
        return;
    }
    var url = e.currentTarget.dataset.audiourl;
    var newUrl = audioHelper.musicUrlContact(url);

    //play
    wx.playBackgroundAudio({
      dataUrl: newUrl,
      title:"title",
      coverImgUrl:"coverImgUrl",
      success: function(res){
        // success
        console.log('success');
        page.managePlaySucess(index);
      },
      fail: function(e) {
        // fail
        console.log('fail~');
        console.log(e);
      },
      complete: function() {
        // complete
        console.log('complete');
      }
    })
  },
  managePlaySucess(index){
    //重置状态
    var audios = this.data.record.Audios;
     for(var i=0;i<audios.length;i++){
          audios[i].selected="";
          audios[i].isMusicPlaying=false;
      }
     audios[index].selected="selected";
     audios[index].isMusicPlaying=true;
      console.log('index '+index);
      console.log(audios[index]);
     this.setData({
        record:this.data.record,
        MusicPlayingIndex:index
      })
     this.changeMusicStatus(true);
  },
  //改变播放音乐的状态
  changeMusicStatus(status){
      this.setData({
        isMusicPlaying:status
      })
  },
  //监听音乐播放
  setMusicLister(){
    var that = this;
    wx.onBackgroundAudioPause(function() {
      console.log('Pause');
      // callback
    }),
    wx.onBackgroundAudioStop(function() {
      // callback
      console.log('Stop');
      var audios = that.data.record.Audios;
      for(var i=0;i<audios.length;i++){
          audios[i].selected="";
          audios[i].isMusicPlaying=false;
      }
      that.setData({
        record:that.data.record,
        MusicPlayingIndex:-1
      })
    })
  },
  //分享界面
  onShareAppMessage:function(){
     return {
      title: this.data.record.TitleCN,
      desc: this.data.record.InfoSections[1].Text,
      path: 'pages/record-detail/record-detail?id='+this.data.record.Id
    }
  }
})