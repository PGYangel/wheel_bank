const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack=require('webpack');

module.exports={
    entry:{
        app:'./src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:__dirname+"/src/index.html"
        }),
        new webpack.NamedModulesPlugin()
    ],
    //source map 检测代码出错在开发的哪个文件中。
    devtool:'inline-source-map',

    devServer:{
        contentBase:'./dist'    //设置 webpack-dev-server执行访问目录
    },
    output:{
        filename: '[name].[chunkhash].js',
        path:path.resolve(__dirname,'dist')
    },
    mode:"production"//压缩输出
};
