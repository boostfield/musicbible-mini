var app = getApp();

module.exports = {
  getRecommendReocrdList: getRecommendReocrdList,
  getLatestRecordList: getLatestRecordList,
  getHotKeyWords: getHotKeyWords,
  getAssociateWords: getAssociateWords,
  getSearchResultRecordList: getSearchResultRecordList,
  getRecordDetail: getRecordDetail,
  getArtistList: getArtistList,
  getArtistDetail: getArtistDetail,
  getArtistRecord: getArtistRecord,
  getArtistAssociateWords: getArtistAssociateWords
}


//获取推荐LP列表
function getRecommendReocrdList(header, data, sucess, fail) {
  var url = app.globalData.Host + "/record/top/list";
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {
      mediatype: "LP",
      page: data.page,
      pageSize: data.pageSize
    },
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

//获取最新LP列表
function getLatestRecordList(header, data, sucess, fail) {
  var url = app.globalData.Host + "/record/list";
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {
      mediatype: "LP",
      page: data.page,
      pageSize: data.pageSize
    },
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

//获取热门关键词
function getHotKeyWords(header, data, sucess, fail) {
  var url = app.globalData.Host + '/hotword';
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {},
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

//获取搜索关联词列表 5个
function getAssociateWords(header, data, sucess, fail) {
  var url = app.globalData.Host + '/suggest?suggest=record&&keyword=' + data.keyword;
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {},
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
 * 搜索艺术家关联词
 */
function getArtistAssociateWords(header, data, sucess, fail) {
  var url = app.globalData.Host + '/suggest?suggest=artist&&keyword=' + data.keyword;
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {},
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

//获取搜索结果列表
function getSearchResultRecordList(header, data, sucess, fail) {
  var url = app.globalData.Host + "/record/list";
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {
      keyword: data.keyword,
      page: data.page,
      pageSize: data.pageSize,
    },
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

//获取唱片详情页
function getRecordDetail(header, data, sucess, fail) {
  var url = app.globalData.Host + "/record/" + data.id;
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {},
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
 * 艺术家列表
 */
function getArtistList(header, data, success, fail) {
  var url = app.globalData.Host + "/artist/list";
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {
      type: '艺术家',
      keyword: data.keyword,
      page: data.page,
      pageSize: data.pageSize,
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
 * 艺术家详情
 */
function getArtistDetail(header, data, success, fail) {
  var url = app.globalData.Host + "/artist/other/" + data.id;
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {},
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
 * 艺术家唱片列表
 */
function getArtistRecord(header, data, success, fail) {
  var url = app.globalData.Host + "/artist/other/" + data.id + '/records';
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {
      page: data.page,
      pageSize: data.pageSize,
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}







//获取时间线列表
function getTimeLineList(header, data, sucess, fail) {
  var url = app.globalData.Host + '/timelines/list';
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    method: 'GET',
    data: {
      page: data.page,
      pageSize: data.pageSize
    },
    success: function (res) {
      sucess(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

