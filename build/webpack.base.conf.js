let config = require('./config'), fs = require('fs'), utils = require("./utils");

// 多页配置
const complexEntry = Object.assign(
	utils.getEntries("./src/module/**/*.js"),
	utils.getComponents('./src/components/common/*.vue')
);

module.exports = {
	entry        : complexEntry,
	/**
	 * path：打包文件存放的绝对路径
	 * publicPath：网站运行时的访问路径( 被许多 webpack 的插件用于在生产模式下更新内嵌到 css、html 文件里的url值。 )
	 * filename：打包后的文件名
	 */
	output       : {
		// 指定输出文件路径，现在是输出到 html5/dist 文件夹下
		// webpack 打包后，生成的 js、css、图片文件会打包放在 path 字段所指定的文件目录中。
		path      : config.build.assetsRoot,
		// 设置为资源访问路径。访问时，则需要通过类似 http://localhost:8080/asstes/index-1.js 来访问资源，如果没有设置，则默认从站点根目录加载。
		// 这里无论是开发环境还是生产环境，统一指向 "/" 根目录
		/**
		 * css 文件中，我们通常都会引入图片或者字符文件，而 webpack 打包过程中，其引用的文件可通过 file-loader 进行打包，并对其文件名进行处理。
		 * webpack 打包的时候，遇到通过相对路径或者绝对路径进行引用的文件，其路径可通过 publicPath 中指定的路径重新合成
		 * webpack 请求 chunk 文件时将会默认请求根目录
		 */
		publicPath: config.dev.assetsPublicPath,
		// [name] 指的是对应多入口页面的文件名 index.js => index、list.js => list
		filename  : '[name].js'
		// 定义了 chunk 的文件名命名规则，这里除了 id 以外，还可以使用 [hash]
		// chunkFilename: "[id].chunk.js"
	},
	// resolve 用来配置应用层的模块 (要被打包的模块) 解析
	resolve      : {
		// 自动扩展文件后缀名，意味着我们 require、import 模块可以省略不写后缀名，需要有一个默认空字符串""，否则在 require 全名的时候反而会找不到
		extensions: ['', '.js', '.vue'],
		// 如果 webpack 在 resolve.root 或者 resolve.modulesDirectories 找不到某个模块了，会去这个目录中找。
		// 这里指向的是项目中的 node_modules 目录
		fallback  : [config.commonPath.fallback],
		// alias 的作用，通过 key，value 的形式，将模块名和路径对应起来，因此，在模块引用的时候，直接通过 require('模块名')的方式进行引用。
		// 模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias     : {
			/**
			 * vue2 经过 2.2 版本升级后, 文件变成了 8 个
			 * vue.common.js、vue.esm.js、vue.js、vue.min.js、vue.runtime.common.js、vue.runtime.esm.js、vue.runtime.js、vue.runtime.min.js
			 * vue.common.js 基于 CommonJS 的完整构建，可以使用 template 选项
			 * vue.js  基于 UMD 的完整构建，可以用于直接 CDN 引用，因为是完整构建，所以可以使用 template 选项，但 webpack 不会自动获取压缩版本
			 */
			'vue$': 'vue/dist/vue.common.js',
			'src' : config.commonPath.src
		}
	},
	// 当引入通过 npm 安装的 node.js 模块时，可能出现找不到依赖的错误。
	// Node.js 模块的依赖解析算法很简单，是通过查看模块的每一层父目录中的 node_modules 文件夹来查询依赖的。
	// 当出现 Node.js 模块依赖查找失败的时候，可以尝试设置 resolve.fallback 和 resolveLoader.fallback 来解决问题。
	// 需要把 node_modules 文件夹的绝对路径添加到 resolveLoader.root 这个选项中。 (resolveLoader: { root: path.join(__dirname, "node_modules") })
	// 和 fallback 作用类似
	// resolveLoader 用来配置 loader 模块的解析
	resolveLoader: {
		fallback: [config.commonPath.fallback]
	},
	module       : {
		// 在 webpack 中 js、css、图片等静态文件都是模块，不同模块的加载是通过模块加载器 ( webpack-loader )来统一管理的
		loaders: [
			{
				// /\.vue$/会匹配 xx.vue 文件
				test  : /\.vue$/,
				loader: 'vue'
			},
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				// include: 必须满足条件
				include: config.commonPath.rootPath,
				// exclude：排除的目录或文件 ( 过滤掉这个条件匹配到的内容 )
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
	// 调用 autoprefixer 插件，自动添加 css 前缀
	postcss      : [
		require('autoprefixer')
	]
};
