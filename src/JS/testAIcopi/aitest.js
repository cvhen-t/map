function  datetoString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day 
}

new Date().toLocaleString()

console.log(datetoString(new Date()));

// 数组转转字符串
function arrayToString(array) {
    var str = "";
    for (var i = 0; i < array.length; i++) {
        str += array[i] + ",";
    }
    return str;
}
arr=[1,2,3,4,5,6,7,8,9,10]
arrayToString(arr)
console.log(arrayToString(arr));

// 对象转字符串
function objectToString(obj) {
    var str = "";
    for (var i in obj) {
        str += i + ":" + obj[i] + ",";
    }
    return str;
}
// 数组排序
 //id为排序依据的属性}
function sort(arr,id){ 
    for(var i=0;i<arr.length-1;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i][id]>arr[j][id]){
                var temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }}

    //数组判断是否包含某个对象
    function isContains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }


// 字符串判断是否包含某个字符串
function isContainsStr(str, obj) {
    var i = str.length;
    while (i--) {
        if (str[i] === obj) {
            return true;
        }
    }
    return false;
}

str= '2020-1-1 000:00:00'

console.log(isContainsStr(str,' '));
// 字符串获取字符串中华某个字符前面的字符串
function getStrBefore(str, obj) {
    var i = str.length;
    while (i--) {
        if (str[i] === obj) {
            return str.substring(0, i);
        }
    }
    return str;
}

console.log(getStrBefore(str,' '));