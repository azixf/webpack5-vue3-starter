const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')


module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    clean: true // 每次打包清理包
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        default: {
          minChunks: 2,
          name: 'default',
          priority: -20
        }
      }
    },
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4, // 开启并行压缩
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true } // 移除css中的comment
            }
          ]
        }
      }),
      new TerserWebpackPlugin({
        minify: TerserWebpackPlugin.uglifyJsMinify, // 压缩js代码
        terserOptions: {
          format: {
            comments: false
          },
          compress: {
            drop_console: true, // 删除所有的console.log
          }
        },
        extractComments: false // 去除注释
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(), // css打包成单独的文件
    new CopyWebpackPlugin({ // 复制不需要打包的文件
      patterns: [{ from: './public', to: './public'}]
    }), 
    new BundleAnalyzerPlugin({ // 生成打包分析文件
      analyzerMode: 'disabled',
      generateStatsFile: true
    }), 
    new ImageMinimizerPlugin({ // 图片压缩
      minify: ImageMinimizerPlugin.squooshMinify
    }),
  ]
})