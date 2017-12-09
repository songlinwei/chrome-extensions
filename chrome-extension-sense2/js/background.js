/*
 * 事件页js，只有本模块才有权限调用所有的特权chrome API
 * 主要提供了各种核心功能
 * 插件的其他部分需要通过消息机制来从本模块获取需要的功能
 */
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到消息request：' + JSON.stringify(request));
    delay(0, request.sendp);

    //获取url列表 然后循环下载
    // runs(0,undefined);

    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});


function sendMessageToContentScript(message, callback) {
    chrome.windows.getLastFocused(
        function (win) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                // console.log(tabs[0].url);
                // message.urlp = tabs[0].url;
                chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                    if (callback) callback(response);
                });
            });
        });
}


var count = 1;

function delay(j, re) {
    setTimeout(function () {
        judge(j, re);
    }, randomNum(4500, 11500));
}


function judge(i, re) {
    if (i <= count) {
        sendMessageToContentScript({
            sendp: re,
            indexi: i,
            typep: 'background.js',
            messagep: 'back我是后台 给你发消息'
        }, function (response) {
            console.log("re:" + response.StatusCodeP);
            if (response.StatusCodeP === 'openok') {
                i += 1;
                delay(i, 'guanbi');
                count = response.countP;
            } else {
                console.log(response.urlp);
                var url = response.urlp;
                // console.log(response.context);
                var fileName = url.substring(url.lastIndexOf('/') + 1);
                console.log(fileName);
                console.log(response.context.length);
                var purl = '<p id="purl">' + url + '</p>';
                if (i < 10) {
                    downloadFile(response.title+'0' + i + '-' + fileName, purl + response.context);
                } else {
                    downloadFile(response.title+i + '-' + fileName, purl + response.context);
                }
                if (i < count) {
                    delay(i, 'xinkai');
                } else {
                    console.log("循环完毕，最后的值为" + i);
                }
            }
        });
        console.log(re + '---' + i + '---' + count + '---' + new Date());
    }
}

function downloadFile(fileName, blobData) {
    // console.log(blobData);
    var blob = new Blob([blobData], {type: "text/plain"});
    saveAs(blob, fileName);
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


//获取url列表 然后循环下载
// var urlsCount = 1;
// function runs(j, urlArr) {
//     setTimeout(function () {
//         listTab(j, urlArr);
//     }, 4000);
// }
// function listTab(j, urlArr) {
//     if (j === 0 && urlArr === undefined) {
//         sendMessageToContentScript({
//             typep: 'background.js',
//             messagep: 'back我是后台 给你发消息'
//         }, function (response) {
//             if (response.urlsCount > 0) {
//                 runs(0, response.urlArr);
//                 urlsCount = response.urlsCount;
//             }
//         });
//     } else if (j < urlsCount) {
//         console.log(j + '----' + (urlArr.length) + '-----' + urlsCount);
//         chrome.downloads.download({
//             url: urlArr[j],
//             conflictAction: 'uniquify',
//             saveAs: false
//         });
//         j += 1;
//         runs(j, urlArr);
//     }
// }
