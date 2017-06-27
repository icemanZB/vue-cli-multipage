let merge             = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FriendlyErrors    = require('friendly-errors-webpack-plugin'),

    webpack           = require('webpack'),
    baseWebpackConfig = require('./webpack.base.conf'),
    config            = require('./config'),
    utils             = require('./utils');

// 热模块加载，将热加载相关代码添加到 entry，用于浏览器自动刷新的时候去加载模块
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
	// ["./build/dev-client","./src/module/index/index.html"]
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
	module : {
		/**
		 * webpack 提供两个工具处理样式表：css-loader 和 style-loader
		 * style-loader 将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌 入webpack 打包后的文件中。
		 * css-loader 使你能够使用类似 @import 和 url(...) 的方法实现 require() 的功能
		 * sass-loader Sass 的预处理器是对原生 CSS 的拓展
		 * 安装 postcss-loader 和 autoprefixer (自动添加前缀的插件)
		 * 书写顺序必须是这样
		 */
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
	// .vue 的配置，需要单独出来配置
	vue    : {
		// loaders 之间是可以串联的，一个加载器的输出可以作为下一个加载器的输入
		// "!" 用来定义 loader 的串联关系，"-loader" 是可以省略不写的，多个 loader 之间用 "!" 连接起来，但所有的加载器都需要通过 npm 来加载。
		loaders: {
			css: 'vue-style-loader!css-loader!sass-loader!postcss-loader'
		}
	},
	// 要启用 source-map 需加上此配置项
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		// 开发过程中都不需要刷新浏览器，任何前端代码的更改都会实时的在浏览器中表现出来
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// 控制台错误有好提示
		new FriendlyErrors()
	]
});

/**
 * HtmlWebpackPlugin：自动帮你生成一个 html 文件，并且引用相关的 css,js 文件
 */
let pages = utils.getEntries('./src/module/**/*.html');
// console.log(pages); { index: './src/module/index/index.html'}
for (let page in pages) {
	if (pages.hasOwnProperty(page)) {
		let conf = {
			filename      : page + '.html',
			template      : pages[page], // 模板路径
			inject        : true, // 把所有产出文件注入到给定的 template 或 templateContent。当传入 true 或者 body 时所有 js 资源将被放置在 body 元素的底部。
			chunksSortMode: 'dependency', // 决定了 script 标签的引用顺序 'dependency' 不用说，按照不同文件的依赖关系来排序。
			// 当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
			/**
			 * webpack.config.js
			 *   entry: {
             *       index: path.resolve(__dirname, './src/index.js'),
             *       index1: path.resolve(__dirname, './src/index1.js'),
             *       index2: path.resolve(__dirname, './src/index2.js')
             *   }
			 *   plugins: [
			 *        new HtmlWebpackPlugin({
             *       chunks: ['index','index2']
             *   })
			 * ]
			 * 执行 webpack 命令之后，你会看到生成的 index.html 文件中，只引用了 index.js 和 index2.js
			 * <script type=text/javascript src=index.js></script>
			 * <script type=text/javascript src=index2.js></script>
			 * 而如果没有指定 chunks 选项，默认会全部引用。
			 */
			// excludeChunks 允许跳过某些 chunks，设置各自所需的 js 模块
			// filter：将数据过滤，去除不是本页面的模块，( list != index ) => excludeChunks :[list]
			excludeChunks : Object.keys(pages).filter(item => item !== page)
		};
		module.exports.plugins.push(new HtmlWebpackPlugin(conf));
	}

}