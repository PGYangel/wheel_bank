var webpack = require('webpack');//引入webpack
var path = require('path');//引入nodejs路径模块，处理路径用的
var glob = require('glob');//glob，这个是一个全局的模块，动态配置多页面会用得着
var HtmlWebpackPlugin = require('html-webpack-plugin'); //这个是通过html模板生成html页面的插件，动态配置多页面用得着
var MiniCssExtractPlugin = require("mini-css-extract-plugin");//分离css，webpack4推荐的分离css的插件
var TransferWebpackPlugin = require('transfer-webpack-plugin');//原封不动的把assets中的文件复制到dist文件夹中
var autoprefixer = require('autoprefixer');//给css自动加浏览器兼容性前缀的插件
var os = require('os');//这个nodejs模块，会帮助我们获取本机ip
var portfinder = require('portfinder');//这个帮助我们寻找可用的端口，如果默认端口被占用了的话
var fs = require('fs');//处理文件用的

//动态添加入口
function getEntry() {
    var entry = {};
    //读取src目录所有page入口
    glob.sync('./src/js/**/*.js').forEach(function (name) {
        var start = name.indexOf('src/') + 4;
        var end = name.length - 3;
        var eArr = [];
        var n = name.slice(start, end);
        n = n.split('/')[1];
        eArr.push(name);
        eArr.push('babel-polyfill');//引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
        entry[n] = eArr;
    })
    return entry;
}

//动态生成html
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/pages/${name}.html`,
        filename: `pages/${name}.html`,
        inject: true,
        hash: false,
        chunks: [name]
    }
};

///////////////////获取本机ip///////////////////////
function getIPAdress(){
    var interfaces = os.networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
var host = getIPAdress();

var ports = fs.readFileSync('./port.json', 'utf8');//把port.json读文件读出来
ports = JSON.parse(ports);//把json格式的数据转成js对象
portfinder.basePort = "8080";//将我们默认的端口设置成8080，默认配置是8000
portfinder.getPort(function(err, port) {//这个函数，portfinder会自动找到可用的端口
    ports.data.port = port;//我们把可以用的端口赋值给port.json里面
    ports = JSON.stringify(ports,null,4);
    fs.writeFileSync('./port.json',ports);//然后再写入prot.json
});

module.exports = {
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: /src/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env'],
                            plugins:['@babel/transform-runtime']
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                //use:['style-loader','css-loader','postcss-loader']//css不分离写法
                //css分离写法
                use:[MiniCssExtractPlugin.loader,"css-loader",{
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version']
                            })
                        ]
                    }
                }]
            },
            {
                test:/\.scss$/,
                //use:['style-loader','css-loader','sass-loader','postcss-loader']//css不分离写法
                //css分离写法
                use:[MiniCssExtractPlugin.loader,"css-loader",{
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version']
                            })
                        ]
                    }
                },"sass-loader"]
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024*5
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({//将css分离出去
            filename: "css/[name].css"
        }),
        new webpack.ProvidePlugin({//全局引入jquery
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        }),
        new TransferWebpackPlugin([//作用相当于copy-webpack-plugin
            {
                from: 'assets',
                to: 'assets'
            }
        ], path.resolve(__dirname,"src")),
        new webpack.HotModuleReplacementPlugin()//热更新模块，这样js改变就不会全部重载，而是只是重载你改过的那一部分
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
        historyApiFallback: false,//true默认打开index.html，false会出现一个目录
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: host,
        port: ports.data.port,
        overlay: true,//出现错误之后会在页面中出现遮罩层提示
        open:true//运行之后自动打开本地浏览器
    }
};

//配置页面
var entryObj = getEntry();
var htmlArray = [];
Object.keys(entryObj).forEach(function(element){
    htmlArray.push({
        _html:element,
        title:'',
        chunks:[element]
    })
});
//自动生成html模板
htmlArray.forEach(function(element){
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html,element.chunks)));
});
