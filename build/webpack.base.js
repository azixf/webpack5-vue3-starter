const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require('path')

const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  entry: "./src/main.ts",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js','.ts','.tsx','.jsx','.json']
  },
  cache: {
    type: 'filesystem' // 缓存到文件系统
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
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 在开发环境，我使用 style-loader 有更高的开发效率，打包时，则能将样式抽离成单独的文件
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(svg|png|bmp|webp|jpe?g|gif)$/,
        type: "asset",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack5-vue-starter",
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
};
