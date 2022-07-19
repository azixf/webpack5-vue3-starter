const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin, ProgressPlugin } = require('webpack')
const path = require('path')
const Components = require('unplugin-vue-components/webpack')
const { AntDesignVueResolver } = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')

const isDev = process.env.NODE_ENV !== 'production'
const { readEnv } = require('./utils/readEnv')
const obj = readEnv(process.env.NODE_ENV)
module.exports = {
  entry: './src/main.ts',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
  },
  cache: {
    type: 'filesystem', // 缓存到文件系统
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 在开发环境，我使用 style-loader 有更高的开发效率，打包时，则能将样式抽离成单独的文件
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  hack: `true; @import "@/styles/override.less";`,
                }, // 覆盖组件库主体变量
              },
              additionalData: `@import "@/styles/variables.less";`, // 全局引入less文件
            },
          },
        ],
      },
      {
        test: /\.(svg|png|bmp|webp|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-vue-starter',
      template: './index.html',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ...obj
      },
    }),
    new ProgressPlugin({ percentBy: 'entries' }), // 展示构建、打包进度
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: 'src/types/components.d.ts',
    }),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      imports: ['vue', 'vue-router'],
      dts: 'src/types/auto-import.d.ts',
    }),
  ],
}
