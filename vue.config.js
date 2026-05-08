// vue.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 关闭 sourceMap，节省内存
  productionSourceMap: false,

  // 关闭并行压缩，避免多线程占用内存
  parallel: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 使用 Terser 压缩，单线程模式
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: false, // 单线程
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ],
      };
    }
  },

  chainWebpack: config => {
    // 禁用 babel-loader 缓存，节省内存
    config.module
      .rule('js')
      .use('babel-loader')
      .tap(options => {
        options.cacheDirectory = false;
        return options;
      });
  },
};
