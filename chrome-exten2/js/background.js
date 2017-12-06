/*
 * 事件页js，只有本模块才有权限调用所有的特权chrome API
 * 主要提供了各种核心功能
 * 插件的其他部分需要通过消息机制来从本模块获取需要的功能
 */
//给右上角的图标加小复层
chrome.browserAction.setBadgeText({text: 'new'});
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});

var count;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.url);
    // 方式3 直接下载
    for (var i=0;i<message.url.length;i++) {
        chrome.downloads.download({
            url: message.url[i],
            conflictAction: 'uniquify',
            saveAs: false
        });
    }
    // 方式1 2
    // count = 0;
    // var zip = new JSZip();
    // downloadFile(message.url[count], onDownloadComplete, message.url, zip);
    sendResponse("下载完一页了");
});

// function downloadFile(url, onSuccess, arrayOfUrl, zip) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = "blob";
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if (onSuccess) {
//                 onDownloadComplete(xhr.response, arrayOfUrl, zip);
//             }
//         }
//     }
//     xhr.send(null);
// }
//
// // 方式一 文本数据直接保存
// function onDownloadComplete(blobData, urls, zip) {
//     if (count < urls.length) {
//         // add downloaded file to zip:
//         var fileName = urls[count].substring(urls[count].lastIndexOf('/') + 1);
//         // zip.file(fileName, binaryData, {base64: true});
//         zip.file(fileName + ".html", blobData, {base64: true}); //file"+count+".docx"
//         if (count < urls.length - 1) {
//             count++;
//             downloadFile(urls[count], onDownloadComplete, urls, zip);
//         } else {
//             chrome.runtime.getBackgroundPage(function () {
//                 zipAndSaveFiles(zip);
//             });
//             count = 0;
//         }
//     }
// }
//
// // 方式二 使用base64处理数据
// // function onDownloadComplete(blobData, urls, zip) {
// //     if (count < urls.length) {
// //         blobToBase64(blobData, function (binaryData) {
// //             // add downloaded file to zip:
// //             var fileName = urls[count].substring(urls[count].lastIndexOf('/') + 1);
// //             // zip.file(fileName, binaryData, {base64: true});
// //             zip.file(fileName + ".txt", binaryData, {base64: true}); //file"+count+".docx"
// //             if (count < urls.length - 1) {
// //                 count++;
// //                 downloadFile(urls[count], onDownloadComplete, urls, zip);
// //             } else {
// //                 chrome.runtime.getBackgroundPage(function () {
// //                     zipAndSaveFiles(zip);
// //                 });
// //                 count = 0;
// //             }
// //         });
// //     }
// // }
// //
// // function blobToBase64(blob, callback) {
// //     var reader = new FileReader();
// //     reader.onload = function () {
// //         var dataUrl = reader.result;
// //         var base64 = dataUrl.split(',')[1];
// //         callback(base64);
// //     };
// //     reader.readAsDataURL(blob);
// // }
//
// function zipAndSaveFiles(zip) {
//     zip.generateAsync({type: "blob"})
//         .then(function (content) {
//             // see FileSaver.js
//             saveAs(content, "example.zip");
//         });
// }
