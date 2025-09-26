/*
 * @Date: 2022-08-22 10:14:32
 * @LastEditTime: 2023-01-04 14:34:04
 */
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: {}
};
