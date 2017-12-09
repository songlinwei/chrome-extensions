chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('content-script:' + JSON.stringify(request));
    //微信 修改默认的新页面打开方式 每个页面使用新的tab打开
    if (request.sendp === 'xinkai') {
        // var lurl = window.location.href;
        // var lurlArr = lurl.split('/');
        var urlArr = new Array();
        // 获取页面的内容 回传到插件页面js
        this.$('.weui_media_title').each(function () {
            urlArr.push($(this).attr("hrefs"));
        });
        var len = urlArr.length;
        window.open(urlArr[request.indexi]);
        sendResponse({StatusCodeP: 'openok', countP: len});
    } else {
        var yuanma = document.documentElement.outerHTML;
        var urlr = window.location.href;
        window.open("", "_self").close(); //关闭当前页面
        sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr, title: '微信公众号-'});
    }

    //微信默认当前页面打开 获取当前页面内容后回退上一页面 微信的页面是下拉加载 这样回重新加载
    // if (request.sendp === 'xinkai') {
    //     var arr = $('.weui_media_title');
    //     arr[request.indexi].click();
    //     var len = arr.length;
    //     sendResponse({StatusCodeP: 'openok', countP: len});
    // } else {
    //     var yuanma = document.documentElement.outerHTML;
    //     var urlr = window.location.href;
    //     window.history.back(-1); //回退到之前页面
    //     sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr, title: '微信公众号-'});
    // }

    // //36kr
    // if (request.sendp === 'xinkai') {
    //     var arr = $('.intro');
    //     arr[request.indexi].click();
    //     var len = arr.length;
    //     sendResponse({StatusCodeP: 'openok', countP: len});
    // } else {
    //     // var yuanma = $('.article-title').text();
    //     var yuanma = document.documentElement.outerHTML;
    //     var urlr = window.location.href;
    //     // window.history.back(-1); 回退到上一页面
    //     window.open("", "_self").close(); //关闭当前页面
    //     sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr, title: '36kr-'});
    // }
    //
    //
    // //今日头条
    // if (request.sendp === 'xinkai') {
    //     var arr = $('.J_title');
    //     arr[request.indexi].click();
    //     var len = arr.length;
    //     sendResponse({StatusCodeP: 'openok', countP: len});
    // } else {
    //     var yuanma = document.documentElement.outerHTML;
    //     var urlr = window.location.href;
    //     // window.history.back(-1); 回退到上一页面
    //     // var f=document.referrer;//之前页面url
    //     // window.location.href=f;
    //     window.open("", "_self").close(); //关闭当前页面
    //     sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr, title: '今日头条-'});
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
