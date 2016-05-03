var path = require('path');

var autoprefixer = require('autoprefixer-core');
var cssnext = require('cssnext');
var doiuse = require('doiuse');
var colors = require('colors');
var wordwrap = require('wordwrap')
var csswring = require('csswring');
var nested = require('postcss-nested');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/js/app.js'
        ]
    },
    output: {
        path: require('path').resolve('build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/, 
                loader: 'json' 
            },
            {
                test: /\.tag$/, 
                loader: 'tag',
                // query: {template: 'jade'}
                query: {type: 'es6', template: 'jade'}
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
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
    postcss: [
        nested,
        cssnext,
        doiuse({
            onFeatureUsage: function(info) {
                var source = info.usage.source;
                // file is whole require path, joined with !'s.. we want the last part
                var sourceFile = path.relative('.', source.input.file.split('!').pop())
                var sourceLine = sourceFile + ':' + source.start.line;
                // take out location info in message itself
                var message = info.message.split(': ').slice(1).join(': ')
                console.log('[doiuse]'.red + ' ' + sourceLine + ': ' + info.featureData.title + '\n');
                console.log(wordwrap(4, process.stdout.columns - 1)(message) + '\n');
            }
        }),
        autoprefixer,
        csswring
    ],
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ]
};
