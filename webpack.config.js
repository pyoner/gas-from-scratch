var path = require('path');
var webpack = require('webpack');
var RemoveWebpackPlugin = require('remove-webpack-plugin');
var Bump = require("bump-webpack-plugin");


var SRC_DIR = path.join(__dirname, 'src');
var BUILD_DIR = path.join(__dirname, 'build');

var config = {
    entry: {
        index: [
            './src/index.js'
        ],
    },
    output: {
        filename: '[name].js',
        path: BUILD_DIR,
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: SRC_DIR,
                query: {
                    presets: [
                        'es2015',
                        'stage-1',
                    ],
                    plugins: [
                        'transform-runtime',
                        'closure-elimination',
                    ]
                }
            }
        ]
    },
    plugins: [
        new RemoveWebpackPlugin([BUILD_DIR]),
        new Bump(['package.json']),
    ]
}
if (process.env.NODE_ENV == 'production') {
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify('production') }
        }),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } })
    ])
}

module.exports = config;
