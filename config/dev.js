const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')
const path = require('path')

module.exports = function (env) {
  return  webpackMerge(commonConfig(), {
    // context: path.resolve('src'),
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './src/app.js'
        // the entry point of our app
      ]
    },
    devtool: 'cheap-module-source-map',
    // devServer: {
    //   port: 8080,
    //   host: 'localhost',
    //   hot: true,
    //   contentBase: path.resolve(__dirname, 'build'),
    //   historyApiFallback: true,
    //   noInfo: false,
    //   stats: 'minimal',
    //   publicPath: '/'
    // },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
    ]
  })
}