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
    var url=app.globalData.HostV1_1+"/records/homerecommends";
    wx.request({
        url:url,
        header:{
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{
            mediaType:"LP",
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

//获取最新LP列表
function getLatestRecordList(header,data,sucess,fail){
    var url=app.globalData.Host+"/HiFiSearch/AdvancedSearch";
    wx.request({
        url:url,
        header:{
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        method:'POST',
        data:{
            MediaType:"LP",
            MusicType:"classical",
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

//获取热门关键词
function getHotKeyWords(header,data,sucess,fail){
    var url = app.globalData.Host+'/HiFiSearch/hot';
    wx.request({
        url:url,
        header:{
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{},
        success:function(res){
            sucess(res);
        },
        fail:function(res){
            fail(res);
        }
    });
}

//获取搜索关联词列表 5个
function getAssociateWords(header,data,sucess,fail){
    var url = app.globalData.Host+'/HiFiSearch/SearchSuggestion?keyword='+data.keyword;
    wx.request({
        url:url,
        header:{
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{},
        success:function(res){
            sucess(res);
        },
        fail:function(res){
            fail(res);
        }
    });
}

//获取搜索结果列表
function getSearchResultRecordList(header,data,sucess,fail){
    var url=app.globalData.Host+"/HiFiSearch/search";
    wx.request({
        url:url,
        header:{
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{
            keyword:data.keyword,
            page:data.page,
            pageSize:data.pageSize,
            searchtype:"RecordType",
            charactertype:"-1"
        },
        success:function(res){
            sucess(res);
        },
        fail:function(res){
            fail(res);
        }
    });
}

//获取唱片详情页
function getRecordDetail(header,data,sucess,fail){
    var url=app.globalData.Host+"/records/item/"+data.id;
    wx.request({
        url:url,
        header:{
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{},
        success:function(res){
            sucess(res);
        },
        fail:function(res){
            fail(res);
        }
    });
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

