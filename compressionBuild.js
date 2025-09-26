/*
 * @Author: Yo yo.lu@foxmail.com
 * @Date: 2022-09-16 12:04:29
 * @LastEditors: Yo yo.lu@foxmail.com
 * @LastEditTime: 2022-09-16 12:08:03
 * @FilePath: \map\compressionBuild.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// compress.js
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const archiver = require('archiver');
const versionConfig = require('./version.json');
const TIME = moment().format('MMDD');
const targetDir = path.join(__dirname, '/dist');
const outputDir = path.join(__dirname, '');
const fileName = `./${TIME}${versionConfig.buildNum}demo.zip`;
function compressFile() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        let output = fs.createWriteStream(`${outputDir}/${fileName}`);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output
            .on('close', () => {
                resolve(console.log('压缩完成！'));
            })
            .on('error', (err) => {
                reject(console.error('压缩失败', err));
            });

        archive.pipe(output);
        archive.directory(targetDir, false);
        archive.finalize();
    });
}
compressFile();
