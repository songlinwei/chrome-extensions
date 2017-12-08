
$(function () {
    $('#popupId').on('click', function () {
        sendMessageToBackground('开始抓取列表页面', function (response) {
            console.log('来自Background.js的回复：' + response);
        });
    }
    );
});


function sendMessageToBackground(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (tabs.length == 0) return console.log('无当前活动窗口');
        chrome.runtime.sendMessage({sendp: 'xinkai', typep: 'popup.js', messagep: message,purl:tabs[0].url}, function (response) {
            callback(response);
        });
    });

}
