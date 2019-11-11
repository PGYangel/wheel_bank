const path=require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
    output:{
        filename: '[name].[hash].js',
        publicPath: 'http://wp.yr.dev.q1.com/',
        path:path.resolve(__dirname,'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
});
