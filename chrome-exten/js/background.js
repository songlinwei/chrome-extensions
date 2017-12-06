/*
 * 事件页js，只有本模块才有权限调用所有的特权chrome API
 * 主要提供了各种核心功能
 * 插件的其他部分需要通过消息机制来从本模块获取需要的功能
 */
chrome.browserAction.setBadgeText({text: 'new'});
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var zip = new JSZip();
    console.log('收到消息request：' + JSON.stringify(request));
    delay(0, request.sendp, zip);
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

var count = 2;

function delay(j, re, zip) {
    setTimeout(function () {
        judge(j, re, zip);
    }, 4000);
}


function judge(i, re, zip) {
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
                delay(i, 'guanbi', zip);
                count = response.countP;
            } else {
                if (i < count) {
                    console.log(response.urlp);
                    var url = response.urlp;
                    // console.log(response.context);
                    var fileName = url.substring(url.lastIndexOf('/') + 1);
                    console.log(fileName);
                    console.log(response.context.length);
                    console.log(response.context);
                    delay(i, 'xinkai', zip);
                    downloadFile(response.urlp, response.context, zip);
                } else {
                    zipAndSaveFiles(zip);
                    console.log("循环完毕，最后的值为" + i);
                }
            }
        });
        console.log(re + '---' + i + new Date());
    }
}

function downloadFile(url, blobData, zip) {
    var blobDataNew = cleanSpaceChar(blobData);
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    console.log(fileName);
    zip.file(fileName + ".html", blobDataNew, {base64: true}); //file"+count+".docx"

}

function zipAndSaveFiles(zip) {
    zip.generateAsync({type: "blob"})
        .then(function (content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
}

function cleanSpaceChar(context) {
    var chinese_pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
// [\u4E00-\u9FA5]表示汉字，[\uFE30-\uFFA0]表示全角
    var newContext = new Array();
    var j = 0;
    for (var i = 0; i < context.length; i++) {
        if (chinese_pattern.exec(context[i])) {
            newContext[j] = context[i];
            j = j + 1;
        }
    }
    return newContext.join("");
}