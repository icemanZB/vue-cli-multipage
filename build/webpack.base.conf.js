let config = require('./config'), fs = require('fs'), utils = require("./utils");


const complexEntry = Object.assign(
	utils.getEntries("./src/module/**/*.js"),
	utils.getComponents('./src/components/common/*.vue')
);

module.exports = {
	entry        : complexEntry,
	output       : {
		path      : config.build.assetsRoot,
		publicPath: config.dev.assetsPublicPath,
		filename  : '[name].js'
	},
	resolve      : {
		extensions: ['', '.js', '.vue'],
		fallback  : [config.commonPath.fallback],
		alias     : {
			'vue$': 'vue/dist/vue.common.js',
			'src' : config.commonPath.src
		}
	},
	resolveLoader: {
		fallback: [config.commonPath.fallback]
	},
	module       : {
		loaders: [
			{
				test  : /\.vue$/,
				loader: 'vue'
			},
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				include: config.commonPath.rootPath,
				exclude: /node_modules/
			},
			{
				test  : /\.json$/,
				loader: 'json'
			},
			{
				test  : /\.html$/,
				loader: 'vue-html'
			}

		]
	},
	postcss      : [
		require('autoprefixer')
	]
};
