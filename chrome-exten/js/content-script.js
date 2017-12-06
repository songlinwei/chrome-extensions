chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('content-script:' + JSON.stringify(request));
    if (request.sendp === 'xinkai') {
        $('#container_jobList>ul>li')[request.indexi].click();
        var count = 3;
        sendResponse({StatusCodeP: 'openok', countP: count});
    } else {
        var yuanma = $('#jp_maskit').text(); //document.documentElement.outerHTML;
        // yuanma=yuanma+$('.p-side-right')[0].text();
        // yuanma = yuanma.replace(/\s/g, '');
        var urlr = window.location.href;
        window.open("", "_self").close();
        sendResponse({StatusCodeP: 'closeok', context: yuanma, urlp: urlr});
    }
});
