const path=require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    output:{
        filename: '[name].js',
        path:path.resolve(__dirname,'dist')
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: './src',  //设置 webpack-dev-server执行访问目录
        hot:true    //启用HMR，发布时要取消使用
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
