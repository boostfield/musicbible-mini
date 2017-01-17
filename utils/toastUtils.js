function showLoadingToast(){
    wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 3000
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
  showSuccessToast:showSuccessToast,
  hideToast:hideToast
}