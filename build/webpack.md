# 公共
## 处理.ts,.js
- @babel/core

- @bable/preset-env
> 对js进行语法转换
- @babel/preset-typescript
> 处理typescript
- babel-loader
> 加载ts,js文件
- babel.config.js
> babel配置文件

## 处理html
- html-webpack-plugin
```js
// webpack.config.js
new HtmlWebpackPlugin({
  title: 'index', // <title><%= HtmlWebpackPlugin.options.title %></title>
  template: 'index.html',
  favicon: path.resolve(__dirname, './public/favicon.ico'), // 在html里能直接访问到 ./favicon.ico
})
```
## 处理.vue
- vue@next
- vue-loader
> 解析vue文件
- @vue/compiler-sfc
> 对vue单文件进行处理

## 处理css,less,sass,scss
- css-loader
> 解析css文件
- style-loader
> 将css文件插入到html style
- postcss-loader
- postcss
- postcss-preset-env
> 给css属性添加兼容性前缀
- less-loader
> 处理less文件
- less
## 处理images
```js
// webpack5原生支持
type: 'asset',
generator: {
  filename: "images/[name].[contenthash][ext]"
}
```
## 处理fonts
```js
// webpack5原生支持
type: 'asset/resources',
generator: {
  filename: "fonts/[name].[contenthash][ext]"
}
```

## 

# 开发环境
```js
  mode: 'development',
  devtool: 'source-map',
  target: 'web', // webpack升级到5.0后，target默认值值会根据package.json中的browserslist改变，导致devServer的自动更新失效所以 development 环境下直接配置成 web
  devServer: {
    host: "localhost", // 主机
    post: 1080, // 端口
    hot: true, // 热更新
    open: false, // 自动打开浏览器
  }
```
# 生产环境
```js
mode: 'production',
output: {
  clean: true // 每次打包清理旧包
},
optimization: {
  splitChunks: { // 对文件进行切片
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 将第三方库打包到有个文件中
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
    new CssMinimizerPlugin({ // css压缩插件
      parallel: 4, // 并行压缩的数量
      minizierOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true // 删除css中所有注释
            }
          }
        ]
      }
    }),
    new TerserWebpackPlugin({

    })
  ]
},
plugins: [
  new MiniCssExtractPlugin(), // css打包成单独的文件
  new CopyWebpackPlugin({ // 处理不需要webpack打包的文件
    patterns: [{ from: './public', to: './public'}]
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true // 生成打包分析文件
  })
]
```

## referrence
> https://juejin.cn/post/6979478474620665887