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
	vue    : {
		loaders: {
			scss: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader'),
			sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader'),
			css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader')
		}
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output : {
		path         : config.build.assetsRoot,
		filename     : `js/[name].js?v=${utils.getVersion()}`,
		chunkFilename: `js/[name].js?v=${utils.getVersion()}`
	},
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),

		new CleanWebpackPlugin('dist/', {
			root   : path.resolve(__dirname, '..'),
			verbose: true
		}),

		new webpack.optimize.UglifyJsPlugin({
			output   : {
				comments: false
			},
			compress : {
				warnings: false
			},
			sourceMap: true
		}),

		new ExtractTextPlugin(`css/[name].css?v=${utils.getVersion()}`),

		new webpack.optimize.OccurrenceOrderPlugin(),

		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name     : ['components'],
			minChunks: 2
		}),

		new webpack.optimize.CommonsChunkPlugin({
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


		new webpack.optimize.CommonsChunkPlugin({
			name  : 'manifest',
			chunks: ['vendor']
		}),

		// 复制高度静态资源
		new TransferWebpackPlugin(
			[
				{
					from: 'static/img', to: '/static/img'
				},
				{
					from: 'static/js', to: '/static/js'
				},
				{
					from: 'static/json', to: '/static/json'
				},
				{
					from: 'static/css', to: '/static/css'
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


