chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('content-script:' + JSON.stringify(request));
    // //微信
    // if (request.sendp === 'xinkai') {
    //     $('.weui_media_title')[request.indexi].click();
    //     var count = 3;
    //     sendResponse({StatusCodeP: 'openok', countP: count});
    // } else {
    //     // var yuanma = $('.article-title').text();
    //     var yuanma =document.documentElement.outerHTML;
    //     var urlr = window.location.href;
    //     window.history.back(-1); //回退到之前页面
    //     // var f=document.referrer;//之前页面url
    //     // window.location.href=f;
    //     // window.open("", "_self").close(); //关闭当前页面
    //     sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr});
    // }

    //36kr
    if (request.sendp === 'xinkai') {
        var arr = $('.intro');
        arr[request.indexi].click();
        var len = arr.length;
        sendResponse({StatusCodeP: 'openok', countP: len});
    } else {
        // var yuanma = $('.article-title').text();
        var yuanma = document.documentElement.outerHTML;
        var urlr = window.location.href;
        // window.history.back(-1); 回退到上一页面
        // var f=document.referrer;//之前页面url
        // window.location.href=f;
        window.open("", "_self").close(); //关闭当前页面
        sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr});
    }
    //
    //
    // //今日头条
    // if (request.sendp === 'xinkai') {
    //     $('.J_title')[request.indexi].click();
    //     var count = 1;
    //     sendResponse({StatusCodeP: 'openok', countP: count});
    // } else {
    //     // var yuanma = $('.article-title').text();
    //     var yuanma =document.documentElement.outerHTML;
    //     var urlr = window.location.href;
    //     // window.history.back(-1); 回退到上一页面
    //     // var f=document.referrer;//之前页面url
    //     // window.location.href=f;
    //     window.open("", "_self").close(); //关闭当前页面
    //     sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr});
    // }

    //获取url列表 然后循环下载
    // var lurl = window.location.href;
    // var lurlArr = lurl.split('/');
    // var urlArr = new Array();
    // // 获取页面的内容 回传到插件页面js
    // this.$('.weui_media_title').each(function () {
    //     urlArr.push(lurlArr[0] + '//' + lurlArr[2] + $(this).attr("hrefs"));
    //     // console.log($(this).attr("hrefs"));
    // });
    // sendResponse({urlsCount: urlArr.length, urlArr: urlArr});

});
