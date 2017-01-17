var app = getApp()
var api = require('../../backend/api.js');
var imageHelper = require('../../utils/imageHelper.js');
var utils = require('../../utils/util.js');
var toastUtils =require('../../utils/toastUtils.js')

var FOOTER_LOADING="加载中...";
var FOOTER_NO_MORE="没有更多了";

Page({
    data: {
        footerString:FOOTER_LOADING,
        isFirstIn:false,
        isHideFooterLoading:true,
        keyWords:[],
        associateWords:[],
        isShowRealSearchBar:false,
        isShowAssociateWords:false,
        isShowRecordResult:false,
        searchContent:"",
        record_search:{
            index:1,
            pageSize:10,
            list:[]
            },
    },
    onLoad:function(){
        this.reqKeyWordsData(this.renderKeyWordsData);
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
           searchContent:"",
            associateWords:new Array(),
            record_search:new Object()
        })

    },
    actionDeleteInputValue:function(){
        //删除input内容
        this.setData({
            isShowRecordResult:false,
            record_search:new Object(),
            searchContent:""
        })
    },
    actionKeyInput:function(e){
        var content = e.detail.value;
        //输入搜索内容
        console.log(e);
        console.log("内容 "+content);
        this.setData({
            isShowAssociateWords:true,
            isShowRecordResult:false,
            searchContent:content
        })
        this.reqAssociateWordsData(this.renderAssociateWordsData);
    },
    actionHotWordSearch:function(e){
        //点击热门词
        console.log("内容 "+e.currentTarget.dataset.hotkey);
        this.setData({
            isShowRealSearchBar:true,
            isShowAssociateWords:true,
            searchContent:e.currentTarget.dataset.hotkey
        })
        this.reqAssociateWordsData(this.renderAssociateWordsData);
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
        if(!this.data.isFirstIn){
        this.setData({
             isFirstIn:true
        });   
            return;
        }
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
    //请求关键字数据
  reqKeyWordsData:function(callback){
    
    api.getHotKeyWords(null,{},function(res){
        callback && callback.call(null,res.data)
    },function(res){
       console.log('获取热门关键词错误');
    })
  },  
  renderKeyWordsData:function(res){
    var newKeyWords=res.result;
    if (newKeyWords.length>0) {
        this.setData({
            keyWords:newKeyWords
        })
    }

  },
  //请求关联词
  reqAssociateWordsData:function(callback){
    var words= this.data.searchContent;
    if (!words) {
        return;
    }

    api.getAssociateWords(null,{
      keyword:words
    },function(res){
        callback && callback.call(null,res.data,false)
    },function(res){
       console.log('获取关联词错误');
    })
  }, 
  //渲染关联词
  renderAssociateWordsData:function(res){
      console.log("test02"+res.result.length);
    var newAssociateWords= res.result;
    if (newAssociateWords.length>0) {
        this.setData({
            associateWords:newAssociateWords
        })
    }
  },
reqResultData:function(callback,isAdd,currentPage){
    //请求搜索结果数据
    toastUtils.showLoadingToast()
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
          toastUtils.hideToast()
          if(isAdd){
             if(res.data.result.DataList.length>0){
              currentPage.data.record_search.index =index;
              currentPage.setData({
                  footerString:FOOTER_LOADING,
                  isHideFooterLoading:true
              });
            }else{
              currentPage.setData({
                 footerString:FOOTER_NO_MORE,
                 isHideFooterLoading:false
              });
            }
            console.log('上拉刷新完成');
          }else{
            console.log('下拉刷新完成')
            wx.stopPullDownRefresh()
          }
        console.log(res);
        callback && callback.call(null,res.data,isAdd)
      },function(res){
          toastUtils.hideToast();
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
    var currentLength = recommendObj.list.length;

    var list = res.result.DataList;
    for (var i=0;i<list.length;i++)
    {
      //唱片图片
      list[i].AppCoverUrl=imageHelper.imageUrlDispatcher(list[i].AppCoverUrl,imageHelper.DISKCOVER);
      list[i].index=i+currentLength;
    }
    if(isAdd){
      list = recommendObj.list.concat(list);
    }
    recommendObj.list=list;
    this.setData({
      record_search:recommendObj
    })
  },
  //错误图片用默认图替代
  imageLoadErrorHander(e){
      var page = this;
      var pageData= page.data;
      console.log("picturn error");
      console.log(e);
      var index = e.currentTarget.dataset.index;
      console.log('index'+index);
      pageData.record_search.list[index].AppCoverUrl = '../../image/img_record_default.png'
      page.setData({
          record_search:pageData.record_search
      })
  }
})