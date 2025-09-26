import { Message } from 'element-ui';

export const togeoJson = (arr, type = 'LineString', text = '') => {
    let res = {
        type: 'FeatureCollection',
        features: [
            {
                id: 2,
                type: 'Feature',
                properties: {
                    title: text,
                    id: 2
                },
                geometry: {
                    coordinates: arr,
                    type
                }
            }
        ]
    };

    return res;
};

export const putStrNowDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    month = month > 9 ? month : '0' + month;
    strDate = strDate > 9 ? strDate : '0' + strDate;
    hour = hour > 9 ? hour : '0' + hour;
    minute = minute > 9 ? minute : '0' + minute;
    second = second > 9 ? second : '0' + second;
    return `${year}${month}${strDate}${hour}${minute}${second}`;
};

// 复制文本到剪贴板的方法
function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard
            .writeText(text)
            .then(function () {
                return true; // 复制成功
            })
            .catch(function () {
                return false; // 复制失败
            });
    } else if (document.execCommand && typeof document.execCommand === 'function') {
        var tempInput = document.createElement('input');
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = 0;
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.setSelectionRange(0, tempInput.value.length);
        var success;
        try {
            success = document.execCommand('copy');
        } catch (e) {
            success = false;
        }
        document.body.removeChild(tempInput);
        return Promise.resolve(success);
    } else {
        return Promise.resolve(false);
    }
}
// 文本复制方法
export const copyText = (text, succ = '复制成功', err = '复制失败') => {
    copyTextToClipboard(text).then(function (success) {
        if (success) {
            Message.success(succ);
        } else {
            Message.error(err);
        }
    });
};
