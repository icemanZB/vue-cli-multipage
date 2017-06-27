let glob = require('glob'); // glob 模块

// 生成版本控制号
exports.getVersion = () => {
	let date = new Date();
	let year  = date.getFullYear().toString(),
	    month = date.getMonth() + 1,
	    day   = date.getDate();
	if (month < 10) month = '0' + month.toString();
	if (day < 10) day = '0' + day.toString();
	return year + month + day;
};

// 多页配置
exports.getEntries = (globPath) => {

	let entries = {};

	// 获取 src 目录 glob.sync('path')
	glob.sync(globPath).forEach((entry) => {
		let tmp = entry.split('/').splice(-3);
		let moduleName = tmp.slice(1, 2);
		entries[moduleName] = entry;
	});

	// 获取的主入口如下： { index: './src/module/index/index.js'}
	return entries;
};

// 提取公共的 components
exports.getComponents = (globPath) => ({ 'components': glob.sync(globPath) });