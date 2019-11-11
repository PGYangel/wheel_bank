const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            // 加载css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 打包图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                            limit: 1024 * 2   //2k以下的图片生成base64码
                        }
                    }
                ]
            },
            //html图片引用可以进行打包
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    }
};
