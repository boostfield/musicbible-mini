var app = getApp()
Page({
    data:{
      id:0,
      tracklist:[
      {
        selected:"",
        position:-1,
        id:1,
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"巴赫: 6首大提琴无伴圣诞节放水淀粉当时发生的首都发生的…",
        subTitle:"BACH:Six Suites For Sol fdsf dsf fsdf dsfsd sdfsd…"
      },
      {
        selected:"",
         position:-1,
        id:2,
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item02",
        subTitle:"subTitle02"
      },
      {
        selected:"",
         position:-1,
        id:3,
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item03",
        subTitle:"subTitle03"
      },
      {
        selected:"",
         position:-1,
        id:4,
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item04",
        subTitle:"subTitle04"
      },
      {
         selected:"",
         position:-1,
        id:5,
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item05",
        subTitle:"subTitle05"
      },
      {
        selected:"",
         position:-1,
        id:6,
        imageCoverUrl:"https://github.com/CaoyangLee/BlankApp/blob/master/scence.jpg?raw=true",
        title:"item06",
        subTitle:"subTitle06"
      },
    ],
    scrollLeft:1,
    checkItem:false,
    },
  scroll: function(e) {
    var pixelRatio=app.pixelRatio;
    var realDistance = 430/pixelRatio;
    var scrollLeft=e.detail.scrollLeft
    var scrollWidth= e.detail.scrollWidth;
    // console.log("realDistance  "+realDistance);
    // console.log("scrollWidth  "+scrollWidth);
    // console.log("scrollLeft  "+e.detail.scrollLeft);
    if(!this.checkItem){
       for(var i=0;i<this.data.tracklist.length;i++){
        this.data.tracklist[i].position=i*realDistance;
      }
      this.checkItem=true;
    }
    //开始处理 找出谁是current
    for(var i=0;i<this.data.tracklist.length;i++){
      var postion=this.data.tracklist[i].position;
      console.log("postion "+postion+" scrollLeft  "+scrollLeft);
      if(scrollLeft<postion){
        var index = i-1;
        console.log("index "+index);
        this.clearAllindex();
        this.data.tracklist[index].selected="selected";
        return;
      }
      
    }

   
    
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: options.id
    })
    if(this.data.tracklist.length!=0){
        this.data.tracklist[0].selected="selected";
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clearAllindex:function(){
    console.log("init dots");
      for(var i=0;i<this.data.tracklist.length;i++){
        var item=this.data.tracklist[i];
          item.selected="";
          console.log("selected   "+i+"  "+item.selected);
    }
  }
})