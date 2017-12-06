chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request.value);
    // 页面全部文本
    // var yuanma=document.documentElement.outerHTML;

    var urlArr = new Array();
    // 获取页面的内容 回传到插件页面js
    this.$('#stoTab1>tbody>tr a[class=linkA]').each(function () {
        urlArr.push($(this).attr("href"));
    });
    var urlArrNew = new Array();
    urlArrNew.push(request.hostS + ':' + urlArr[0]);
    urlArrNew.push(request.hostS + ':' + urlArr[1]);
    $('.page>a[class^=after]')[0].click();
    sendResponse(urlArrNew);
});
