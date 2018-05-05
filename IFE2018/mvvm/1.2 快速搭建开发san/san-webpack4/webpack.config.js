// [参考：webpack4-用之初体验，一起敲它十一遍 - 掘金](https://juejin.im/post/5adea0106fb9a07a9d6ff6de)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin	=	require('friendly-errors-webpack-plugin');
// https://www.npmjs.com/package/webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// webpack打包体积优化，详细分布查看插件 webpack-bundle-analyzer

// 就在于会将打包到js里的css文件进行一个拆分，拆分CSS
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const os = require('os');
// JS压缩插件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// 是否打包分析
const bundleAnalyzerReport = process.env.npm_config_report;

const isDev = process.env.NODE_ENV === 'development';
console.log('当前运行环境', process.env.NODE_ENV);
const config = {
	entry: './src/js/main.js',
	output: {
		filename: 'bundle.[hash:6].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'raw-loader'
			},
			// {
			//     test: /\.css$/,
			//     // 从右向左解析
			//     // use: ['style-loader', 'css-loader'] // 从右向左解析
			//     // 这样写方便配置参数
			//     use: [
			//         {
			//             loader: 'style-loader'
			//         },
			//         {
			//             loader: 'css-loader'
			//         },
			//         {
			//             loader: 'postcss-loader'
			//         }
			//     ]
			// },
			// {
			//     test: /\.css$/,
			//     // 从右向左解析
			//     // use: ['style-loader', 'css-loader'] // 从右向左解析
			//     // 这样写方便配置参数
			//     use: ExtractTextWebpackPlugin.extract({
			//         // 将css用link的方式引入就不再需要style-loader了
			//         use: [
			//             {
			//                 loader: 'css-loader'
			//             },
			//             {
			//                 loader: 'postcss-loader'
			//             }
			//         ]
			//     })
			// },
			{
				test: /\.less$/,
				use: isDev ? [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					}
				] : ExtractTextWebpackPlugin.extract({
					// 将css用link的方式引入就不再需要style-loader了
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
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
				test: /\.js$/,
				use: 'babel-loader',
				// 只转化src目录下的js
				include: /src/,
				// 排除掉node_modules，优化打包速度
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				// include: [ resolve('src') ],
				options: {
					formatter: require('eslint-friendly-formatter'),
				},
			},
			{
				test: /\.san$/,
				loader: 'san-loader'
			}
			// {
			//     test: /\.(htm|html)$/,
			//     use: 'html-withimg-loader'
			// }
		],
	},
	resolve: {
		alias: {
			san: isDev
				? 'san/dist/san.dev.js'
				: 'san/dist/san.js'
		}
	},
	devServer: {
		contentBase: './dist',
		// 默认是localhost
		host: '0.0.0.0',
		// 端口
		port: 3000,
		// 自动打开浏览器
		// open: true,
		// 开启热更新
		hot: true,
		overlay: {
			errors: true,
			warnings: true,
		},
		watchOptions: {
			ignored: /node_modules/
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new CleanWebpackPlugin('dist'),
		new HtmlWebpackPlugin({
			// 配置输出文件名和路径
			filename: 'index.html',
			// 配置文件模板
			template: './src/pages/index.html',
			hash: true, // 会在打包好的bundle.js后面加上hash串
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// 拆分后会把css文件放到dist目录下的css/style.css
		new ExtractTextWebpackPlugin('css/style.css'),
		new FriendlyErrorsWebpackPlugin(),
		// JS压缩
		new UglifyjsWebpackPlugin({
			uglifyOptions: {
				ie8: true,
				ecma: 8,
				mangle: true,
				output: { comments: false },
				compress: {
					warnings: false,
					drop_debugger: true,
					drop_console: true,
				}
			},
			sourceMap: false,
			cache: true,
			parallel: os.cpus().length * 2
		})
	],
	mode: 'none'
};

if(isDev){
	// do nothing
}
else{
	if(bundleAnalyzerReport){
		config.plugins.push(
			new BundleAnalyzerPlugin()
		);
	}
}

module.exports = config;