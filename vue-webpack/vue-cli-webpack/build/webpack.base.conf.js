'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack");


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  plugins: [
    /**
     * https://www.webpackjs.com/plugins/provide-plugin/
     *
     * 自动加载模块，而不必到处 import 或 require 。
     *
     * 全部模块都可以使用，不是全局，在window中是没有的。类似vue的全局混合
     *
     * 不使用 @babel/plugin-transform-modules-commonjs 的情况下，只支持es5模块输出规范的模块
     *
     * 语法：
     * identifier: 'module1',
     * 或者：
     * identifier: ['module1', 'property1'],
     *
     * module1-模块，property1-模块里面的属性
     */
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      globalPlugin:"@/common/providePlugin.js", // 相当于每个模块 import 通过这个路径引入这个模块。所以不能用相对路径，只能用绝对路径
      globalPlugin_relative:"../src/common/providePlugin.js", // 采用错误的相对路径写法，有些模块用的 “globalPlugin_relative” 就会报错
      globalPlugin_default:["@/common/providePlugin.js","default"], // 对于 ES2015 模块的 default export，你必须指定模块的 default 属性。
      author:"@/common/providePluginAuthor",
      author_first_name:["@/common/providePluginAuthor","firstName"],
      author_last_name:["@/common/providePluginAuthor","lastName"],
      author_year:["@/common/providePluginAuthor","year"]
    })
  ],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
