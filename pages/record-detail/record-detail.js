var app = getApp()
Page({
    data:{
      record:{
      id:0,
      title:"title",
      subtitle:"subTitle",
      intro:"intro",
      serialnumber:"serialnumber",
      year:"year",
      lable:"lable",
      composor:"composor",
      artist:"artist",
      coverList:[
      {
        selected:"",
        position:-1,
        id:"item0",
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"巴赫: 6首大提琴无伴圣诞节放水淀粉当时发生的首都发生的…",
        subTitle:"BACH:Six Suites For Sol fdsf dsf fsdf dsfsd sdfsd…"
      },
      {
        selected:"",
         position:-1,
        id:"item1",
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item02",
        subTitle:"subTitle02"
      },
      {
        selected:"",
         position:-1,
        id:"item2",
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item03",
        subTitle:"subTitle03"
      },
      {
        selected:"",
         position:-1,
        id:"item3",
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item04",
        subTitle:"subTitle04"
      },
      {
         selected:"",
         position:-1,
        id:"item4",
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item05",
        subTitle:"subTitle05"
      },
      {
        selected:"",
         position:-1,
        id:"item5",
        imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
        title:"item06",
        subTitle:"subTitle06"
      },
    ]},
    scrollLeft:1,
    checkItem:false,
    previewCoverUrl:"",
    isHidePreivew:true
    },
  scroll: function(e) {
    var pixelRatio=app.globalData.pixelRatio;
    var realDistance = 470/pixelRatio;
    var scrollLeft=e.detail.scrollLeft
    var scrollWidth= e.detail.scrollWidth;
    // console.log("realDistance  "+realDistance);
    // console.log("scrollWidth  "+scrollWidth);
    // console.log("scrollLeft  "+e.detail.scrollLeft);
    var currentList= this.data.record.coverList;
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
      if(scrollLeft<postion){
        console.log("postion "+postion+" scrollLeft  "+scrollLeft);
        var index = i-1;
        console.log("index "+index);
        this.clearAllindex(currentList);
        currentList[index].selected="selected";
        this.data.record.coverList = currentList
        
         this.setData({
           //scrollLeft:currentList[index].position,
            record:this.data.record
        })
        return;
      }else if(scrollLeft>=this.data.record.coverList[currentList.length-1].position){
        console.log("postion "+postion+" scrollLeft  "+scrollLeft);
        var index =currentList.length-1;
        console.log("index "+index);
        this.clearAllindex(currentList);
        currentList[index].selected="selected";
        this.data.record.coverList = currentList
         this.setData({
            //scrollLeft:currentList[index].position,
            record:this.data.record
        })
        return;
        
      }   
    }  
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.record.id = options.id;
    this.setData({
      record: this.record
    })
    //初始化小数点
    if(this.data.record.coverList.length!=0){
      
        this.data.record.coverList[0].selected="selected";
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
  actionImagePreview:function(e){
    //图片预览
    var cover=e.currentTarget.dataset.cover;
    this.setData({
      previewCoverUrl:cover,
      isHidePreivew:false
    })
    console.log(e);
  },
  closePreview:function(){
    //关闭图片预览
    this.setData({
      isHidePreivew:true
    })
  },
  clearAllindex:function(currentList){
      for(var i=0;i<currentList.length;i++){
          currentList[i].selected="";
    }
  },
  manageScrollResult:function(index){
    var currentList= this.data.tracklist;

  }
})