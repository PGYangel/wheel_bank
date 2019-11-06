const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack=require('webpack');

module.exports={
    entry:{
        app:'./src/index.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    //source map 检测代码出错在开发的哪个文件中。
    devtool:'inline-source-map',

    devServer:{
        contentBase:'./dist',    //设置 webpack-dev-server执行访问目录
        hot:true    //启用HMR，发布时要取消使用
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode:"production"//压缩输出
};
