var app = getApp()
Page({
    isShowRealSearchBar:false,
    data: {
        keywords:["巴赫","贝多芬","月光","第九号交响曲","安雅·陶尔","柴可夫斯基","钢琴奏鸣曲","迈克尔·杰克逊","小提琴协奏曲","合唱交响曲","海顿","鲁道夫"]
    },
    actionSearch:function(){
        this.setData({
           isShowRealSearchBar:true
        })
    },
    actionCancle:function(){
         this.setData({
           isShowRealSearchBar:false
        })
    }
})