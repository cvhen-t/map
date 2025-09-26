const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
window = dom.window;
document = window.document;
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = './public/JQ/index.js';
document.getElementsByTagName('head')[0].appendChild(script);

const path = require('path');
const targetDir = path.join(__dirname, '/dist');
var input = document.createElement('input');
input.type = 'file';
input.focus();
let whe = new ActiveXObject('WScript.shell');
whe.SendKeys('{Tab}');
whe.SendKeys('{}');
whe.SendKeys('{ E :demo\vueLenaDemomapdist}');
whe.SendKeys('{Enter');

// input.value = targetDir;
uploadPic(1);

const uploadPic = (type) => {
    let formData = new FormData();
    let key = input.files[0].files;
    let url = 'http://121.4.20.238:20229/uploads/uploads';
    if (type === 1) {
        // 上传文件夹
        url = 'http://121.4.20.238:20229/uploads/uploadFolder';
        key = input.files[0].files;
    }
    // 当文件夹上传时，就把文件夹的文件依次添加进 formData
    for (var i = 0; i < key.length; i++) {
        formData.append('file', key[i]);
    }
    // 简单写个ajax 调用
    $.ajax({
        url: url,
        data: formData,
        type: 'post',
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        crossDomain: true,
        cache: false,
        success: function (res) {
            alert('上传成功');
        }
    });
};
