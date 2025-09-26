const moment = require('moment');
const { writeFileSync } = require('fs');
const versionConfig = require('./version.json');
const versionDay = moment().format('DD');
let version = {
    version: versionConfig.version,
    buildNum: versionConfig.buildNum,
    day: versionDay
};

if (versionDay !== versionConfig.day) {
    //  次日后打包记录重置
    version.buildNum = '01';
}
if (versionDay == versionConfig.day) {
    // 今日打包次数递增
    let res = versionConfig.buildNum * 1 + 1;
    version.buildNum = res < 9 ? `0${res}` : `${res}`;
}

// version版本递增
let versionArr = versionConfig.version.split('.');
if (versionArr.length > 0) {
    versionArr[2] = `${versionArr[2] * 1 + 1}`;
    if (versionArr[2] * 1 > 9) {
        versionArr[1] = `${versionArr[1] * 1 + 1}`;
        versionArr[2] = `1`;
    }
    if (versionArr[1] * 1 > 9) {
        versionArr[0] = `${versionArr[0] * 1 + 1}`;
        versionArr[1] = `1`;
    }
    version.version = versionArr.join('.');
}

writeFileSync('./version.json', JSON.stringify(version), (error) => {
    if (error) {
        console.log('写入version.sjon失败', error);
        return;
    }
});
