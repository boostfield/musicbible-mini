var app = getApp()
Page({
    isShowRealSearchBar:false,
    searchContent:"",
    data: {
        keywords:["巴赫","贝多芬","月光","第九号交响曲","安雅·陶尔","柴可夫斯基","钢琴奏鸣曲","迈克尔·杰克逊","小提琴协奏曲","合唱交响曲","海顿","鲁道夫"]
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
           isShowRealSearchBar:false
        })
    },
    actionDeleteInputValue:function(){
        //删除input内容
         console.log("删除input内容");
    },
    actionKeyInput:function(e){
        //输入搜索内容
        console.log(e);
        console.log("内容 "+e.detail.value);
        this.setData({
            searchContent:e.detail.value
        })
    },
    actionHotWordSearch:function(e){
        //点击热门词
        console.log("内容 "+e.currentTarget.dataset.hotkey);
        this.setData({
            searchContent:e.currentTarget.dataset.hotkey
        })
    }
})