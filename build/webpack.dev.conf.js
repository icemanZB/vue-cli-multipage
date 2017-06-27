let merge             = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FriendlyErrors    = require('friendly-errors-webpack-plugin'),

    webpack           = require('webpack'),
    baseWebpackConfig = require('./webpack.base.conf'),
    config            = require('./config'),
    utils             = require('./utils');


Object.keys(baseWebpackConfig.entry).forEach(function (name) {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
	module : {
		loaders: [
			{
				test   : /\.css$/,
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test   : /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			}
		]
	},
	vue    : {
		loaders: {
			css: 'vue-style-loader!css-loader!sass-loader!postcss-loader'
		}
	},
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new FriendlyErrors()
	]
});

let pages = utils.getEntries('./src/module/**/*.html');
for (let page in pages) {
	if (pages.hasOwnProperty(page)) {
		let conf = {
			filename      : page + '.html',
			template      : pages[page],
			inject        : true,
			chunksSortMode: 'dependency',
			excludeChunks : Object.keys(pages).filter(item => item !== page)
		};
		module.exports.plugins.push(new HtmlWebpackPlugin(conf));
	}

}