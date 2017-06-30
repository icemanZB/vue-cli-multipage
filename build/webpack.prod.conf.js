let path                  = require('path'),
    webpack               = require('webpack'),
    merge                 = require('webpack-merge'),
    ExtractTextPlugin     = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin     = require('html-webpack-plugin'),
    CleanWebpackPlugin    = require('clean-webpack-plugin'),
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    OptimizeCSSPlugin     = require('optimize-css-assets-webpack-plugin'),

    baseWebpackConfig     = require('./webpack.base.conf'),
    config                = require('./config'),
    utils                 = require('./utils');

module.exports = merge(baseWebpackConfig, {
	module : {
		// 使用 extract-text-webpack-plugin 就可以把 css从 js 中独立抽离出来
		// 'style-loader' 一定要单独处理写在前面
		loaders: [
			{
				test  : /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			},
			{
				test  : /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader')
			}
		]
	},
	// .vue 文件的配置
	vue    : {
		loaders: {
			scss: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader'),
			sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader'),
			css : ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader')
		}
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output : {
		path    : config.build.assetsRoot,
		filename: `js/[name].js?v=${utils.getVersion()}`,
		// filename     : 'js/[name].[chunkhash].js',
	},
	plugins: [

		// 使用 webpack 的 DefinePlugin 来指定生产环境，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),

		// 清空生成目录
		new CleanWebpackPlugin('dist/', {
			root   : path.resolve(__dirname, '..'),
			verbose: true
		}),

		// js 压缩
		new webpack.optimize.UglifyJsPlugin({
			output   : {
				comments: false
			},
			compress : {
				warnings: false
			},
			sourceMap: true
		}),

		// 提取 css
		new ExtractTextPlugin(`css/[name].css?v=${utils.getVersion()}`),

		new webpack.optimize.OccurrenceOrderPlugin(),

		// css 压缩
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name     : ['components'],
			minChunks: 2 // 组件使用2次以上，打包进 components.js 中
		}),

		new webpack.optimize.CommonsChunkPlugin({
			// 注意不要.js后缀，提取公共内容
			name: ['vendor'],
			minChunks(module) {
				// console.log(module.resource);
				return (
					( module.resource &&
						/\.js|\.css$/.test(module.resource) &&
						module.resource.indexOf(
							path.join(__dirname, '../node_modules')
						) === 0 ||
						module.resource && /common\.scss$/.test(module.resource)
						||
						module.resource && /utils\.js$/.test(module.resource)
					)
				)
			}

		}),

		// 为了避免 hash 值改变，vendor.js 的 hash 也改变了，这样浏览器就不会缓存了
		// 用 manifest 实现 js 库的增量更新，发现 vendor 的 hash 值并未改变，并且多了一个manifest.js的小文件。
		// manifest.js 为 webpack 的启动文件代码，它会直接影响到 hash 值，用 mainfest 单独抽出来了，这样 vendor 的 hash 就不会变了。
		new webpack.optimize.CommonsChunkPlugin({
			name  : 'manifest',
			chunks: ['vendor']
		}),

		// 复制高度静态资源
		new TransferWebpackPlugin(
			[
				{
					from: 'static/js', to: '/static/js'
				}
			], config.commonPath.rootPath
		)
	]
});

let pages = utils.getEntries('./src/module/**/*.html');
for (let page in pages) {
	if (pages.hasOwnProperty(page)) {
		let conf = {
			filename      : page + '.html',
			template      : pages[page],
			inject        : true,
			excludeChunks : Object.keys(pages).filter(item => item !== page),
			chunksSortMode: 'dependency'
		};
		module.exports.plugins.push(new HtmlWebpackPlugin(conf));
	}

}


