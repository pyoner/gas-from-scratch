var path = require('path');
var webpack = require('webpack');
var RemoveWebpackPlugin = require('remove-webpack-plugin');
var Bump = require("bump-webpack-plugin");


var BUILD_DIR = path.join(__dirname, './build');

var config = {
    entry: {
        index: './src/index.js',
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
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'src'),
            query: {
                presets: [
                    'es2015',
                ]
            }
        }]
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
