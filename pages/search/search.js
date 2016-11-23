var app = getApp()
var api = require('../../backend/api.js');
var imageHelper = require('../../utils/imageHelper.js');
var utils = require('../../utils/util.js');
Page({
    data: {
        isHideFooterLoading:true,
        keyWords:["巴赫","贝多芬","月光","第九号交响曲","安雅·陶尔","柴可夫斯基","钢琴奏鸣曲","迈克尔·杰克逊","小提琴协奏曲","合唱交响曲","海顿","鲁道夫"],
        associateWords:["巴赫1111111111111111111111111111111111111111111","巴赫222222222222","巴赫333333333","巴赫4444444","巴赫55555555"],
        isShowRealSearchBar:false,
        isShowAssociateWords:false,
        isShowRecordResult:false,
        searchContent:"",
        record_search:{
            index:1,
            pageSize:10,
            list:[]
            },
        searchResultArray:[
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"巴赫: 6首大提琴无伴圣诞节放水淀粉当时发生的首都发生的…",
            subTitle:"BACH:Six Suites For Sol fdsf dsf fsdf dsfsd sdfsd…"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item02",
            subTitle:"subTitle02"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item03",
            subTitle:"subTitle03"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item04",
            subTitle:"subTitle04"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item05",
            subTitle:"subTitle05"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item06",
            subTitle:"subTitle06"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item06",
            subTitle:"subTitle06"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item06",
            subTitle:"subTitle06"
        },
        {
            imageCoverUrl:"http://img.blog.csdn.net/20141012230011472?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG1qNjIzNTY1Nzkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
            title:"item06",
            subTitle:"subTitle06"
        },
        ]
    },
    actionSearch:function(){
        //搜索bar
        this.setData({
           isShowRealSearchBar:true
        })
    },
    actionCancle:function(){
        //取消搜索
         this.setData({
           isShowRealSearchBar:false,
           isShowAssociateWords:false,
           isShowRecordResult:false,
           searchContent:""
        })
    },
    actionDeleteInputValue:function(){
        //删除input内容
        this.setData({
            isShowRecordResult:false,
            searchContent:""
        })
    },
    actionKeyInput:function(e){
        //输入搜索内容
        console.log(e);
        console.log("内容 "+e.detail.value);
        this.setData({
            isShowAssociateWords:true,
            isShowRecordResult:false,
            searchContent:e.detail.value
        })
    },
    actionHotWordSearch:function(e){
        //点击热门词
        console.log("内容 "+e.currentTarget.dataset.hotkey);
        this.setData({
            isShowRealSearchBar:true,
            isShowAssociateWords:true,
            searchContent:e.currentTarget.dataset.hotkey
        })
    },
    actionAssociateWordSearch:function(e){
        //点击关联词
        console.log("内容 "+e.currentTarget.dataset.hotkey);
         this.setData({
             isShowRecordResult:true,
             isShowAssociateWords:false,
             searchContent:e.currentTarget.dataset.hotkey
        })
        this.reqResultData(this.renderResultData,false,this);
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
        this.reqResultData(this.renderResultData,true,this);
        //延迟加载
        // setTimeout(this.onBottomRefreshSucess,2000);
    },
    onPullDownRefreshSuccess:function(){
        wx.stopPullDownRefresh();
    },
    onBottomRefreshSucess:function(){
        this.setData({
            isHideFooterLoading:true
        });
    }, 
    reqResultData:function(callback,isAdd,currentPage){
    //请求搜索结果数据
      if(isAdd){
        var index = currentPage.data.record_search.index+1;
      }else{
        var index=1;
      }
      api.getSearchResultRecordList(null,{
        keyword:this.data.searchContent,
        page:index,
        pageSize:this.data.record_search.pageSize
      },function(res){
          if(isAdd){
             if(res.data.result.DataList.length>0){
              currentPage.data.record_search.index =index;
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
  renderResultData:function(res,isAdd){
    //渲染搜索结果唱片数据
    var recommendObj =this.data.record_search;
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
      record_search:recommendObj
    })
  }
})