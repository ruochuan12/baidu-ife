// [参考：webpack4-用之初体验，一起敲它十一遍 - 掘金](https://juejin.im/post/5adea0106fb9a07a9d6ff6de)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 就在于会将打包到js里的css文件进行一个拆分，拆分CSS
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'bundle.[hash:6].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 从右向左解析
                // use: ['style-loader', 'css-loader'] // 从右向左解析
                // 这样写方便配置参数
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            // {
            //     test: /\.css$/,
            //     // 从右向左解析
            //     // use: ['style-loader', 'css-loader'] // 从右向左解析
            //     // 这样写方便配置参数
            //     use: ExtractTextWebpackPlugin.extract({
            //         // 将css用link的方式引入就不再需要style-loader了
            //         use: 'css-loader'       
            //     })
            // },
            // {
            //     test: /\.(jpe?g|png|gif)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            //                 outputPath: 'images/'   // 图片打包后存放的目录
            //             }
            //         }
            //     ]
            // },
            {
                test:/\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            // {
            //     test: /\.(htm|html)$/,
            //     use: 'html-withimg-loader'
            // }
        ],
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            // 配置输出文件名和路径
            filename: 'index.html',
            // 配置文件模板
            template: './src/pages/index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css')
    ],
    mode: 'development'
};