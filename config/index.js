'use strict'
const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //port: 8086, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },
  test:{
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/chunyu_admin/', //为 测试服的公共路径
    assetsSubDirectory: 'static/vue/vue_chunyu_admin_pc',
    expressRoot:'/Users/cy/myTest/express/dist', //存放本机 express 服务下
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/index.html'), // Template for index.html
  },
  biztest:{
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsPublicPath: '/chunyu_admin/', //为 测试服的公共路径
      assetsSubDirectory: 'static/vue/vue_chunyu_admin_pc',
      expressRoot:'/Users/cy/myTest/express/dist', //存放本机 express 服务下
      productionSourceMap: true,
      devtool: '#source-map',
      productionGzip: false,
      productionGzipExtensions: ['js', 'css'],
      bundleAnalyzerReport: process.env.npm_config_report,
      index: path.resolve(__dirname, '../dist/templates/vue_chunyu_admin_pc/index.html'), // Template for index.html
   },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    //assetsPublicPath: '//dn-chunyu.qbox.me/@/',    //为线上提供公共路径
    assetsPublicPath: '//static.chunyuyisheng.com/@/',    //为线上提供公共路径
    assetsSubDirectory: 'static/vue/vue_chunyu_admin_pc',      //子目录(包括测试和线上都使用此子目录)
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/vue_chunyu_admin_pc/index.html'),

  }
}
