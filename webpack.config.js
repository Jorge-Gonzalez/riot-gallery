const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  // debug: DEBUG ? true : false,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  entry: {
    app: [
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/app.js'
    ]
  },
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    path: path.resolve('build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve('src/modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-cssnext')()
                  ]
                }
              }
            }
          ]
        })
      },
      {
        test: /\.tag.pug$/,
        loader: 'tag-loader',
        // query: {template: 'jade'}
        query: {type: 'es6', template: 'jade'}
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}
