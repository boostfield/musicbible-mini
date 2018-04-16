function showLoadingToast(){
    wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 10000
    })  
}
function showNoMoreToast(){
    wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 1000
    })  
}
function showSuccessToast(){
    wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
    })  
}
function hideToast(){
    wx.hideToast()
}


module.exports = {
  showLoadingToast: showLoadingToast,
  showNoMoreToast:showNoMoreToast,
  showSuccessToast:showSuccessToast,
  hideToast:hideToast
}