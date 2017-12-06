/**
 * 保存当前页面
 * @param  {Function} callback 保存完成后的回调函数
 */
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log(tabs[0].url);
        var hostStr = tabs[0].url.split("://")[0];
        console.log(hostStr);
        message.hostS = hostStr;
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function sendMessageToBackground(urls, callback) {
    chrome.tabs.query({'currentWindow': true, 'active': true}, function (tabs) {
        if (tabs.length == 0) return console.log('无当前活动窗口');
        chrome.runtime.sendMessage({'command': 'savePage', 'url': urls}, function (response) {
            callback(response);
        });
    });

}


$(function () {
    $('#window-update-size_768').on('click', delay(0));
});

function delay(j){
    setTimeout(function(){
        judge(j);
    },5000);
}

function judge(i){
    if(i<2){
        i+=1;
        console.log(i+new Date());
        sendMessageToContentScript({cmd: 'test', value: i + '你好，我是popup！'}, function (response) {
            console.log('来自content的回复：' + response);
            //内容传送到vackground.js
            sendMessageToBackground(response, function (responseb) {
                console.log('来自content的回复：' + responseb);
            });
        });
        delay(i);
    }else{
        console.log("循环完毕，最后的值为"+i);
    }
}