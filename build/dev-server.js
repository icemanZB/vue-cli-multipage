let path            = require('path'),
    fs              = require('fs'),

    opn             = require('opn'),
    proxyMiddleware = require('http-proxy-middleware'),
    express         = require("express"),
    app             = express(),

    config          = require('./config'),
    proxyTable      = config.dev.proxyTable,
    port            = config.dev.port,
    webpackConfig   = require('./webpack.dev.conf'),
    webpack         = require('webpack');


let compiler = webpack(webpackConfig);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats     : {
		colors: true,
		chunks: false
	}
});

let hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({
			action: 'reload'
		});
		cb();
	});
});

Object.keys(proxyTable).forEach(function (context) {

	let options = proxyTable[context];

	if (typeof options === 'string') {
		options = {
			target: options
		};
	}

	// console.log('----'+options.target);
	// if (options.target.indexOf("localhost") >= 0) {
	//     options.pathRewrite = (path) => {
	//         if (path.indexOf("?") >= 0) {
	//             return path.replace('/api/', '/static/json/').replace("?", ".json?");
	//         }
	//
	//         return path.replace('/api/', '/static/json/') + '.json';
	//     };
	// }

	app.use(proxyMiddleware(context, options));

});


app.use(devMiddleware);

app.use(hotMiddleware);

app.use(config.commonPath.staticPath, express.static('./static'));

// app.get('*', function (request, response, next) {
//
//     if (request.url.indexOf('.json') != -1) {
//         // console.log('get');
//         next();
//     } else {
//         // 这里指向的是 自己创建的静态文件
//         response.sendFile(path.resolve(__dirname, '../src', 'index.html'));
//     }
//
// });


// app.use(config.commonPath.staticPath, function (req, res, next) {
//     console.log('post');
//     if (req.method.toUpperCase() == 'POST' && req.url.indexOf('.json') != -1) {
//         var filePath = path.resolve(__dirname, '../static' + req.url);
//         fs.readFile(filePath, function (err, contents) {
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             res.write(contents);
//             res.end();
//         });
//     } else {
//         console.log('next');
//         next();
//     }
// });

let uri = 'http://localhost:' + port;

let _resolve;
let readyPromise = new Promise(resolve => {
	_resolve = resolve
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
	console.log('> Listening at ' + uri + '\n');
	// opn(uri)
	_resolve();
});

let server = app.listen(port);

module.exports = {
	ready: readyPromise,
	close: () => {
		server.close()
	}
};