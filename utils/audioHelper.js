var URL_ALIYUN_MUSIC ="http://hifimedia.oss-cn-hangzhou.aliyuncs.com";

function musicUrlContact(url){
    if(!url){
        return
    }
    if(url.indexOf("mp3")==-1){
        throw new error("this is not a mp3 file");
    }
    if (url.startsWith("http://")) {
        return url;
    }
    if (url.startsWith("https://")) {
        return url;
    }
    if ('/' != url.charAt(0)) {
        url = "/".concat(url);
    }
    //编码前
    var newUrl = URL_ALIYUN_MUSIC+url;

    //编码中
    try{
        newUrl = encodeURI(newUrl);
    }catch(e){

    }finally{

    }

    //编码后
    return newUrl;
}

module.exports = {
    musicUrlContact: musicUrlContact
}