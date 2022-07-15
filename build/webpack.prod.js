const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[hash].js',
    clean: true // 每次打包清理包
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,  // 提取chunk的最小体积
      minChunks: 1, // 要提取的chunk最少被引用次数
      cacheGroups: { // 对要提取的trunk进行分组
        defaultVendors: { // 匹配node_modules中的三方库，将其打包成一个trunk
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        default: {  // 将至少被两个trunk引入的模块提取出来打包成单独trunk
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
      new TerserWebpackPlugin({ // 压缩js代码
        parallel: 4,
        minify: (file, sourceMap) => {
          const uglifyJsOptions= {
            compress: {
              annotations: false, // 忽略注释
              drop_console: true, // 是否移除console相关函数
              pure_funcs: ['console.log'], // 只移除console.log
              unsafe: true, // 安全转义
              unsafe_proto: true,// eg: Array.prototype.slice.call(a) 转义为 [].slice.call(a)
              unsafe_undefined: true, // undefined 转译为 void 0
            }
          }
          if(sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap
            }
          }
          return require('uglify-js').minify(file, uglifyJsOptions)
        }
      })
    ]
  },
  plugins: [
    new CompressionPlugin({ // gzip打包
      test: /\.(js|css)(\?.*)?$/i
    }),
    new MiniCssExtractPlugin({ // css提取成文件
      filename: 'style/[name].[hash:8].css',
      chunkFilename: 'style/[hash:8].css'
    }),
    new CopyWebpackPlugin({ // 复制不需要打包的文件
      patterns: [{ from: './public', to: './public'}]
    }),
    new BundleAnalyzerPlugin({ // 生成打包分析文件
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    new ImageMinimizerPlugin({ // 图片压缩
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: {
              quality: 100
            },
            webp: {
              lossless: 1
            },
            avif: {
              cqLevel: 0
            }
          }
        }
      },
    }),
  ]
})
