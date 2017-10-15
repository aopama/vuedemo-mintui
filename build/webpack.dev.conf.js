var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var pageroot = require('../config/page')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackinfo = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //new HtmlWebpackPlugin({
    //  filename: 'index.html',
    //  template: 'index.html',
    //  inject: true,
    //  title:'首页',
    //  chunks:['index']
    //}),
    //new HtmlWebpackPlugin({
    //  filename: 'home.html',
    //  template: 'home.html',
    //  inject: true,
    //  title:'home',
    //  chunks:['home']
    //}),
    new FriendlyErrorsPlugin()
  ]
}

utils.getEntry(pageroot.PageRoot,function(pa){
  pa.forEach((v,i)=>{
    const pageName = v.slice(v.lastIndexOf('/')+1);
    webpackinfo.plugins.push(new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: `${v}/${pageName}.html`,
      inject: true,
      chunks:[pageName]
    }))
  });
})

module.exports = merge(baseWebpackConfig,webpackinfo );
