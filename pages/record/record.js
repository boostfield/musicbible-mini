//index.js
//获取应用实例
var app = getApp()
var api = require('../../backend/api.js')
var imageHelper = require('../../utils/imageHelper.js')
var toastUtils = require('../../utils/toastUtils.js')

var LP_RECOMMEND = 1;
var LP_LATEST = 2;
var lp_type = [LP_RECOMMEND, LP_LATEST];

var FOOTER_LOADING = "加载中...";
var FOOTER_NO_MORE = "没有更多了";

var FOOT_Strings = ["loading", "nomore"];

Page({
  data: {
    currentTab: lp_type[0],
    tabSelect: [false, true],
    isLoading: false,
    footerString: FOOTER_LOADING,
    isHideFooterLoading: true,
    record_recommed: {
      index: 1,
      pageSize: 8,
      list: []
    },
    record_latest: {
      index: 1,
      pageSize: 8,
      list: []
    },
  },
  onLoad: function () {
    console.log('onLoad')
    //获取推荐唱片列表
    this.reqRecommendData(this.renderRecommendData, false);
    //获取最新唱片列表
    this.reqLatestData(this.renderLatestData, false);
  },
  //请求推荐唱片信息
  reqRecommendData: function (callback, isAdd, showLoading = true) {
    var currentPage = this;
    var currentData = currentPage.data;
    currentPage.setData({
      isLoading: true
    })
    if (showLoading) {
      toastUtils.showLoadingToast()
    }
    if (isAdd) {
      var index = currentData.record_recommed.index + 1;
    } else {
      var index = 1;
    }
    //api请求
    api.getRecommendReocrdList(null, {
      page: index,
      pageSize: this.data.record_recommed.pageSize
    }, function (res) {
      currentPage.setData({
        isLoading: false
      })
      toastUtils.hideToast()
      if (isAdd) {
        if (res.data.result.dataList.length > 0) {
          currentData.record_recommed.index = index;
          currentPage.setData({
            footerString: FOOTER_LOADING,
            isHideFooterLoading: true
          });
        } else {
          toastUtils.showNoMoreToast()
          currentPage.setData({
            footerString: FOOTER_NO_MORE,
            isHideFooterLoading: false,

          });
        }
        console.log('上拉刷新完成');
      } else {
        console.log('下拉刷新完成')
        wx.stopPullDownRefresh()
      }
      // console.log(res);
      callback && callback.call(currentPage, res.data, isAdd)
    }, function (res) {
      currentPage.managetErrorResult();
    })
  },
  //请求最新的唱片信息
  reqLatestData: function (callback, isAdd, showLoading = true) {
    var currentPage = this;
    this.setData({
      isLoading: true
    })
    if (showLoading) {
      toastUtils.showLoadingToast()
    }
    if (isAdd) {
      var index = currentPage.data.record_latest.index + 1;
    } else {
      var index = 1;
    }
    //api请求
    api.getLatestRecordList(null, {
      page: index,
      pageSize: this.data.record_latest.pageSize
    }, function (res) {
      currentPage.setData({
        isLoading: false
      })
      toastUtils.hideToast()
      if (isAdd) {
        if (res.data.result.dataList.length > 0) {
          currentPage.data.record_latest.index = index;
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
      }
      // console.log(res);
      callback && callback.call(currentPage, res.data, isAdd)
    }, function (res) {
      currentPage.managetErrorResult();
    })
  },
  //处理网络请求的错误结果
  managetErrorResult() {
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
  },
  //渲染推荐唱片数据
  renderRecommendData: function (res, isAdd) {
    var pageData = this.data;
    // console.log(pageData)
    var recommendObj = pageData.record_recommed;
    var list = res.result.dataList;
    for (var i = 0; i < list.length; i++) {
      //唱片图片
      if (list[i].cover_url) {
        list[i].cover_url = imageHelper.imageUrlDispatcher(list[i].cover_url, imageHelper.DISKCOVER);
      }
    }
    if (isAdd) {
      list = recommendObj.list.concat(list);
    }
    recommendObj.list = list;
    this.setData({
      record_recommed: recommendObj
    })
  },
  //渲染最新唱片数据
  renderLatestData: function (res, isAdd) {
    var pageData = this.data;
    // console.log(pageData)
    var latestObj = pageData.record_latest;
    var list = res.result.dataList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].cover_url) {
        list[i].cover_url = imageHelper.imageUrlDispatcher(list[i].cover_url, imageHelper.DISKCOVER);
      }
    }

    if (isAdd) {
      list = latestObj.list.concat(list);
    }
    latestObj.list = list;
    this.setData({
      record_latest: latestObj
    })
  },
  //推荐按钮 点击
  recommend_onclick: function () {
    this.setData({
      footerString: FOOTER_LOADING,
      currentTab: lp_type[0],
      tabSelect: [false, true],
      scrollTop: 100
    })
  },
  //最新按钮 点击
  latest_onclick: function () {
    this.setData({
      footerString: FOOTER_LOADING,
      currentTab: lp_type[1],
      tabSelect: [true, false],
      scrollTop: 100
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    console.log("xia la shua xin");
    wx.showNavigationBarLoading()
    let tabSelect = this.data.tabSelect
    if (tabSelect[0]) {
      //获取推荐唱片列表
      this.reqRecommendData(this.renderRecommendData, false, false);
    } else if (tabSelect[1]) {
      //获取最新唱片列表
      this.reqLatestData(this.renderLatestData, false, false);
    }

    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500)
  },
  //上拉刷新
  onReachBottom: function () {
    console.log("触发上拉刷新");
    console.log("isLoading=" + this.data.isLoading)
    if (this.data.isLoading) return
    this.setData({
      isHideFooterLoading: false
    });
    if (this.data.currentTab === lp_type[0]) {
      this.reqRecommendData(this.renderRecommendData, true);
    } else {
      this.reqLatestData(this.renderLatestData, true);
    }
    //延迟加载
    //setTimeout(this.onBottomRefreshSucess,2000);
  },
  //分享界面
  onShareAppMessage: function () {
    return {
      title: '音乐圣经黑胶库',
      desc: '推荐唱片&最新唱片',
      path: 'pages/record/record'
    }
  }
})