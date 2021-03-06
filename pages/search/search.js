var app = getApp()
var api = require('../../backend/api.js');
var imageHelper = require('../../utils/imageHelper.js');
var utils = require('../../utils/util.js');
var toastUtils = require('../../utils/toastUtils.js')

var FOOTER_LOADING = "加载中...";
var FOOTER_NO_MORE = "没有更多了";

Page({
  data: {
    footerString: FOOTER_LOADING,
    isFirstIn: false,
    isHideFooterLoading: true,
    isHideArtistFooterLoading: true,
    keyWords: [],
    associateWords: [],
    isShowRealSearchBar: false,
    isShowAssociateWords: false,
    isShowResult: false,
    searchContent: "",
    record_search: {
      index: 1,
      pageSize: 10,
      list: []
    },
    artist_search: {
      index: 1,
      pageSize: 10,
      list: []
    },
    isShowRecordResult: true,
    isShowArtistResult: false,
    tabSelected: 0
  },
  onLoad: function () {
    this.reqKeyWordsData(this.renderKeyWordsData);
  },
  actionSearch: function () {
    //搜索bar
    this.setData({
      isShowRealSearchBar: true
    })
  },
  actionCancle: function () {
    //取消搜索
    this.setData({
      isShowRealSearchBar: false,
      isShowAssociateWords: false,
      isShowResult: false,
      searchContent: "",
      associateWords: new Array(),
      record_search: {
        index: 1,
        pageSize: 10,
        list: []
      },
      artist_search: {
        index: 1,
        pageSize: 10,
        list: []
      },
      isShowRecordResult: true,
      isShowArtistResult: false,
      tabSelected: 0
    })

  },
  actionDeleteInputValue: function () {
    //删除input内容
    this.setData({
      isShowResult: false,
      record_search: {
        index: 1,
        pageSize: 10,
        list: []
      },
      searchContent: "",
      artist_search: {
        index: 1,
        pageSize: 10,
        list: []
      },
      isShowRecordResult: true,
      isShowArtistResult: false,
      tabSelected: 0
    })
  },
  actionKeyInput: function (e) {
    var content = e.detail.value;
    //输入搜索内容
    console.log(e);
    console.log("内容 " + content);
    this.setData({
      isShowAssociateWords: true,
      isShowResult: false,
      searchContent: content
    })
    this.reqAssociateWordsData(this.renderAssociateWordsData);
    this.reqArtistAssociateWordsData(this.renderArtistAssociateWordsData);
  },
  actionHotWordSearch: function (e) {
    //点击热门词
    console.log("内容 " + e.currentTarget.dataset.hotkey);
    this.setData({
      isShowRealSearchBar: true,
      isShowResult: true,
      isShowAssociateWords: false,
      searchContent: e.currentTarget.dataset.hotkey
    })
    this.reqResultData(this.renderResultData, false, this);
    this.reqArtistData(this.renderArtistData, false, this);
  },
  actionAssociateWordSearch: function (e) {
    //点击关联词
    console.log("内容 " + e.currentTarget.dataset.hotkey);
    this.setData({
      isShowResult: true,
      isShowAssociateWords: false,
      searchContent: e.currentTarget.dataset.hotkey
    })
    this.reqResultData(this.renderResultData, false, this);
    this.reqArtistData(this.renderArtistData, false, this);
  },
  onPullDownRefresh: function () {
    console.log("xia la shua xin");
    setTimeout(this.onPullDownRefreshSuccess, 2000);
  },
  onReachBottom: function () {
    if (this.data.isShowAssociateWords) return
    if (!this.data.isFirstIn) {
      this.setData({
        isFirstIn: true
      });
      return;
    }
    console.log("shang la shua xin");
    if (this.data.tabSelected == 0) {
      this.setData({
        isHideFooterLoading: false,
      });
      this.reqResultData(this.renderResultData, true, this);
    } else if (this.data.tabSelected == 1) {
      this.setData({
        isHideArtistFooterLoading: false,
      });
      this.reqArtistData(this.renderArtistData, true, this);
    }
    //延迟加载
    // setTimeout(this.onBottomRefreshSucess,2000);
  },
  onPullDownRefreshSuccess: function () {
    wx.stopPullDownRefresh();
  },
  onBottomRefreshSucess: function () {
    this.setData({
      isHideFooterLoading: true,
      isHideArtistFooterLoading: true
    });
  },
  //请求关键字数据
  reqKeyWordsData: function (callback) {
    var that = this;
    api.getHotKeyWords(null, {}, function (res) {
      callback && callback.call(that, res.data)
    }, function (res) {
      console.log('获取热门关键词错误');
    })
  },
  renderKeyWordsData: function (res) {
    var newKeyWords = res.result;
    if (newKeyWords.length > 0) {
      this.setData({
        keyWords: newKeyWords
      })
    }

  },
  //请求关联词
  reqAssociateWordsData: function (callback) {
    var that = this;
    var words = this.data.searchContent;
    if (!words) {
      return;
    }

    api.getAssociateWords(null, {
      keyword: words
    }, function (res) {
      callback && callback.call(that, res.data, false)
    }, function (res) {
      console.log('获取关联词错误');
    })
  },
  //渲染关联词
  renderAssociateWordsData: function (res) {
    console.log("test02" + res.result.length);
    var newAssociateWords = res.result;
    if (newAssociateWords && newAssociateWords.length > 8) {
      newAssociateWords = newAssociateWords.slice(0, 8)
    }
    this.setData({
      associateWords: newAssociateWords
    })
  },

  /**
   * 请求艺术家关联词
   */
  reqArtistAssociateWordsData: function (callback) {
    var that = this;
    var words = this.data.searchContent;
    if (!words) {
      return;
    }

    api.getArtistAssociateWords(null, {
      keyword: words
    }, function (res) {
      callback && callback.call(that, res.data, false)
    }, function (res) {
      console.log('获取关联词错误');
    })
  },
  /**
   * 渲染艺术家关联词
   */
  renderArtistAssociateWordsData: function (res) {
    console.log("test02" + res.result.length);
    var newAssociateWords = res.result;
    this.setData({
      artistAssociateWords: newAssociateWords
    })
  },

  reqResultData: function (callback, isAdd, currentPage) {
    var that = this;
    //请求搜索结果数据
    toastUtils.showLoadingToast()
    if (isAdd) {
      var index = currentPage.data.record_search.index + 1;
    } else {
      var index = 1;
    }
    api.getSearchResultRecordList(null, {
      keyword: this.data.searchContent,
      page: index,
      pageSize: this.data.record_search.pageSize
    }, function (res) {
      toastUtils.hideToast()
      if (isAdd) {
        if (res.data.result.dataList.length > 0) {
          currentPage.data.record_search.index = index;
          currentPage.setData({
            footerString: FOOTER_LOADING,
            isHideFooterLoading: true
          });
        } else {
          currentPage.setData({
            footerString: FOOTER_NO_MORE,
            isHideFooterLoading: false
          });
        }
        console.log('上拉刷新完成');
      } else {
        console.log('下拉刷新完成')
        wx.stopPullDownRefresh()
      }
      console.log(res);
      callback && callback.call(that, res.data, isAdd)
    }, function (res) {
      toastUtils.hideToast();
      if (isAdd) {
        console.log('上拉刷新出现问题');
        currentPage.setData({
          isHideFooterLoading: true
        });
      } else {
        console.log('下拉刷新出现问题')
        wx.stopPullDownRefresh()
      }
    })
  },
  renderResultData: function (res, isAdd) {
    //渲染搜索结果唱片数据
    var recommendObj = this.data.record_search;
    var currentLength = recommendObj.list.length;

    var list = res.result.dataList;
    for (var i = 0; i < list.length; i++) {
      //唱片图片
      if (list[i].cover_url) {
        list[i].cover_url = imageHelper.imageUrlDispatcher(list[i].cover_url, imageHelper.DISKCOVER);
      }
      list[i].index = i + currentLength;
    }
    if (isAdd) {
      list = recommendObj.list.concat(list);
    }
    recommendObj.list = list;
    this.setData({
      record_search: recommendObj
    })
  },

  /**
   * 艺术家搜索
   */
  reqArtistData: function (callback, isAdd, currentPage) {
    var that = this;
    //请求搜索结果数据
    toastUtils.showLoadingToast()
    if (isAdd) {
      var index = currentPage.data.artist_search.index + 1;
    } else {
      var index = 1;
    }
    api.getArtistList(null, {
      keyword: this.data.searchContent,
      page: index,
      pageSize: this.data.artist_search.pageSize
    }, function (res) {
      toastUtils.hideToast()
      if (isAdd) {
        if (res.data.result.dataList.length > 0) {
          currentPage.data.artist_search.index = index;
          currentPage.setData({
            footerString: FOOTER_LOADING,
            isHideArtistFooterLoading: true
          });
        } else {
          currentPage.setData({
            footerString: FOOTER_NO_MORE,
            isHideArtistFooterLoading: false
          });
        }
        console.log('上拉刷新完成');
      } else {
        console.log('下拉刷新完成')
        wx.stopPullDownRefresh()
      }
      console.log(res);
      callback && callback.call(that, res.data, isAdd)
    }, function (res) {
      toastUtils.hideToast();
      if (isAdd) {
        console.log('上拉刷新出现问题');
        currentPage.setData({
          isHideArtistFooterLoading: true
        });
      } else {
        console.log('下拉刷新出现问题')
        wx.stopPullDownRefresh()
      }
    })
  },
  renderArtistData: function (res, isAdd) {
    //渲染搜索结果唱片数据
    var recommendObj = this.data.artist_search;
    var currentLength = recommendObj.list.length;

    var list = res.result.dataList;
    for (var i = 0; i < list.length; i++) {
      //唱片图片
      if (list[i].avatar) {
        list[i].avatar = imageHelper.imageUrlDispatcher(list[i].avatar, imageHelper.DISKCOVER);
      }
      list[i].index = i + currentLength;
    }
    if (isAdd) {
      list = recommendObj.list.concat(list);
    }
    recommendObj.list = list;
    this.setData({
      artist_search: recommendObj
    })
  },

  toggleTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      tabSelected: index,
      isShowRecordResult: index == 0 ? true : false,
      isShowArtistResult: index == 1 ? true : false
    })
  },

  //分享界面
  onShareAppMessage: function () {
    return {
      title: '音乐圣经黑胶库',
      desc: '搜索唱片',
      path: 'pages/search/search'
    }
  }
})