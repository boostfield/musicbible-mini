var app = getApp();

module.exports = {
    getRecommendReocrdList: getRecommendReocrdList,
    getLatestRecordList:getLatestRecordList,
    getHotKeyWords:getHotKeyWords,
    getAssociateWords:getAssociateWords,
    getSearchResultRecordList:getSearchResultRecordList,
    getRecordDetail:getRecordDetail
}


//获取推荐LP列表
function getRecommendReocrdList(header,data,sucess,fail){

}

//获取最新LP列表
function getLatestRecordList(header,data,sucess,fail){

}

//获取热门关键词
function getHotKeyWords(header,data,sucess,fail){

}

//获取搜索关联词列表 5个
function getAssociateWords(header,data,sucess,fail){

}

//获取搜索结果列表
function getSearchResultRecordList(header,data,sucess,fail){

}

//获取唱片详情页
function getRecordDetail(header,data,sucess,fail){

}





//获取时间线列表
function getTimeLineList(header,data,sucess,fail){
    var url = app.globalData.Host+'/timelines/list';
    wx.request({
        url:url,
        header:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{
            page:data.page,
            pageSize:data.pageSize
        },
        success:function(res){
            sucess(res);
        },
        fail:function(res){
            fail(res);
        }
    });
}