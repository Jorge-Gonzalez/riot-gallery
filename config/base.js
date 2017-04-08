const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function () {
  return {
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
}
