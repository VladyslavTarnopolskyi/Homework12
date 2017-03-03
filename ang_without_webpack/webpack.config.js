'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    entry:  './js/scripts.js',
    output: {
        path: __dirname + '/build',
        publicPath: '/build',
        filename: '[name].js'
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : null,

    resolve: {
        extensions: ['', '.js', '.scss']
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }, {
                test: /\.js|jsx$/,
                loader: 'babel',
                query: {
                    presets: ['angular', 'es2015', 'stage-2'],
                    plugins: ['syntax-async-functions', 'transform-regenerator']
                }
            }, {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            }]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true})
    ]
};

module.exports = config;
