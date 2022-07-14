const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  target: 'web', // webpack升级到5.0后，target默认值值会根据package.json中的browserslist改变，导致devServer的自动更新失效所以 development 环境下直接配置成 web
  devServer: {
    hot: true, // 热更新
    open: false, // 自动打开浏览器
    quiet: true
  }
})