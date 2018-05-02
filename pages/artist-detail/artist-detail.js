var app = getApp()
var api = require('../../backend/api.js');
var imageHelper = require('../../utils/imageHelper.js');
var utils = require('../../utils/util.js');
var toastUtils = require('../../utils/toastUtils.js')

var FOOTER_LOADING = "加载中...";
var FOOTER_NO_MORE = "没有更多了";

var FOOT_Strings = ["loading", "nomore"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    records: {
      id: -1,
      page: 1,
      pageSize: 20,
      list: []
    },
    url: '',
    tabSelected: 0,
    isLoading: false,
    isHideFooterLoading: true,
    footerString: FOOTER_LOADING,
    nodes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: 'https://api2.musicbible.com' + "/app/index.html#!/artist/" + options.id
    })
    this.reqArtistDetail(this.renderArtistDetail, options);
    this.data.records.id = options.id
    this.reqArtistRecord(this.renderArtistRecord, false);
  },

  toggleTab(e) {
    this.setData({
      tabSelected: e.currentTarget.dataset.index
    })
  },

  /**
   * 艺术家详情
   */
  reqArtistDetail: function (callback, data) {
    var that = this;
    api.getArtistDetail(null, data, function (res) {
      callback && callback.call(that, res.data)
    }, function (res) {
      console.log('获取热门关键词错误');
    })
  },

  renderArtistDetail: function (res) {
    const detail = res.result
    detail.avatar = imageHelper.imageUrlDispatcher(detail.avatar, imageHelper.DISKCOVER);
    if (detail.info_sections && detail.info_sections.length > 0) {
      detail.info = detail.info_sections[0].text
    } else {
      detail.info = ''
    }
    this.setData({
      detail: detail
    })
  },

  /**
   * 艺术家唱片
   */
  reqArtistRecord: function (callback, isAdd) {
    var that = this;
    if (isAdd) {
      this.data.records.page += 1
    } else {
      this.data.records.page == 1
    }
    this.data.isLoading = true
    api.getArtistRecord(null, this.data.records, function (res) {
      that.setData({
        isLoading: false
      })
      if (isAdd) {
        if (res.data.result.dataList.length > 0) {
          that.data.records.page = res.data.result.page;
          that.setData({
            footerString: FOOTER_LOADING,
            isHideFooterLoading: true
          });
        } else {
          that.setData({
            footerString: FOOTER_NO_MORE,
            isHideFooterLoading: false
          });
        }
        console.log('上拉刷新完成');
      } else {
        console.log('下拉刷新完成')
      }
      callback && callback.call(that, res.data, isAdd)
    }, function (res) {
      console.log('获取热门关键词错误');
    })
  },

  renderArtistRecord: function (res, isAdd) {
    res.result.dataList.forEach((item) => {
      if (item.cover_url) {
        item.cover_url = imageHelper.imageUrlDispatcher(item.cover_url, imageHelper.DISKCOVER);
      }
    })
    this.setData({
      records: {
        id: this.data.records.id,
        page: res.result.page,
        pageSize: 20,
        list: isAdd ? this.data.records.list.concat(res.result.dataList) : res.result.dataList
      },
    })
  },

  //上拉刷新
  onReachBottom: function () {
    console.log("触发上拉刷新");
    if (this.data.isLoading) return
    this.setData({
      isHideFooterLoading: false
    });
    if (this.data.tabSelected == 1) {
      this.reqArtistRecord(this.renderArtistRecord, true);
    }
  },
})