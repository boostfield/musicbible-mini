function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//检查期望参数长度是否与真是参数长度一致
function checkArguments(args){
  var actual=args.length;
  var expected=args.callee.length;
  if(actual!==expected)
    throw Error("Expected "+expected+"args; got"+actual);
}

//类似trim()的函数
function trim(t){
  return (t||"").replace(/^\s+|\s+$/g, "");
}

module.exports = {
  formatTime: formatTime,
  trim:trim
}