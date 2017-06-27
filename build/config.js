// 引入 nodejs 中的 'path' 模块
let path     = require("path"),
    // __dirname  是 node.js 中的一个全局变量，用来获取当前模块文件所在目录的完整绝对路径
    // path.resolve([from ...], to); from：源路径 to：将被解析到绝对路径的字符串
    // __dirname => E:\project\Code\StudyRedux\build  => E:\project\Code\StudyRedux\
    rootPath = path.resolve(__dirname, '../'),
    src      = path.join(rootPath, 'src');

console.log(__dirname, rootPath);

// module.exports 是 nodejs 的写法
module.exports = {
	build     : {
		assetsRoot         : path.resolve(__dirname, '../dist'),
		assetsSubDirectory : 'static',
		assetsPublicPath   : '/',
		productionSourceMap: true
	},
	dev       : {
		port              : 8089,
		assetsSubDirectory: 'static',
		assetsPublicPath  : '/',
		proxyTable        : {
			'/api': {
				target     : ['http://99.48.210.179:8090', 'http://172.30.11.179:8090'][0],
				pathRewrite: {
					'^/api': '/'
				}
			}
		},
		cssSourceMap      : false
	},
	commonPath: {
		rootPath  : rootPath,
		staticPath: path.posix.join('/', 'static'),
		fallback  : path.join(rootPath, 'node_modules'),
		src       : src
	}
};
