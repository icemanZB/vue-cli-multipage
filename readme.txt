#查看 webpack 版本信息
npm info webpack

# 安装指定版本的 webpack
npm install webpack@1.14.0 --save-dev

cnpm install node-sass --save-dev


1. npm init 创建 package.json
2. npm install webpack --save-dev
   npm install react react-dom react-router --save

   // babel 其实是几个模块化的包，其核心功能位于称为 babel-core 的 npm 包中
   // babel-preset-es2015 解析Es6
   // babel-preset-react 解析JSX
   // babel-plugin-transform-runtime 类似帮助函数 _defineProperty 可能会重复出现在一些模块里，导致编译后的代码体积变大。
   // Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。
   // babel-preset-stage-2 ES7不同阶段语法提案的转码规则（共有4个阶段）
   npm install babel-core babel-loader  babel-preset-es2015 babel-preset-react babel-plugin-transform-runtime babel-preset-stage-2 --save-dev
   npm install clean-webpack-plugin --save-dev
   // css-loader 使能够使用类似 @import 和 url(...) 的方法实现 require()的功能，它对 CSS Modules 的支持最好
   // https://github.com/css-modules/webpack-demo
   // style-loader 将所有的计算后的样式加入页面中
   npm install style-loader css-loader --save-dev
   // css 预处理器，sass-loader 依赖 node-sass 和 sass
   npm install sass sass-loader --save-dev
   // node-sass 安装不上，使用 淘宝的 npm install -g cnpm --registry=https://registry.npm.taobao.org
   cnpm install node-sass --save-dev
   // html-webpack-plugin 自动创建 html 文件 https://github.com/ampedandwired/html-webpack-plugin
   npm install html-webpack-plugin --save-dev
   // webpack-merge   https://www.npmjs.com/package/webpack-merge
   npm install webpack-merge --save-dev
   // http-proxy-middleware   node 代理，转发所有请求代理到真实的后端真实API地址  https://www.npmjs.com/package/http-proxy-middleware
   npm install http-proxy-middleware --save-dev
   // opn  打开默认浏览器
   npm install opn --save-dev
   // webpack-dev-middleware 就是一个运行于内存中的文件系统，也是 express 的中间件。https://github.com/webpack/webpack-dev-middleware/
   // webpack-hot-middleware 热替换
   npm install webpack-dev-middleware webpack-hot-middleware --save-dev
   // friendly-errors-webpack-plugin 友好的错误提示
   npm install friendly-errors-webpack-plugin --save-dev
   // express
   npm install express --save-dev
   // json-loader
   npm install json-loader --save-dev
   // postcss-loader https://www.npmjs.com/package/postcss-loader
   npm install postcss-loader autoprefixer --save-dev
   // 把 css 从 js 文件中提取出来，放到一个单独的 css 文件中  https://github.com/webpack/extract-text-webpack-plugin
   npm install extract-text-webpack-plugin --save-dev
   // ora 优雅的终端器  https://www.npmjs.com/package/ora
   npm install ora --save-dev
   // shelljs 可以让我们在 node 环境的 js 中使用 shell
   npm install shelljs --save-dev
   // clean-webpack-plugin 用于在building之前删除你以前build过的文件
   npm install clean-webpack-plugin --save-dev
   // classnames 方便处理class
   npm install classnames --save-dev
   // isomorphic-fetch 处理 ajax 提交
   // es6-promise es6 兼容处理
   npm install isomorphic-fetch es6-promise --save
   // js-cookie cookie 处理
   npm install js-cookie --save
   // antd UI
   npm install antd --save
   // babel-plugin-import 支持 antd 按需 js 和 css 同时按需加载。 https://github.com/ant-design/babel-plugin-import
   npm install babel-plugin-import --save-dev
   // 由于 antd 是基于 less，所以要安装less，按需引用 https://github.com/webpack-contrib/less-loader
   npm install less less-loader --save-dev
   // reflux
   npm install reflux --save




   // npm install express-urlrewrite --save-dev

   // babel-preset-stage-1  处理异步加载语法
   // npm install babel-preset-stage-1 --save-dev


   // 使用 react 编写代码时，能让修改的部分自动刷新。但这和自动刷新网页是不同的，因为 hot-loader 并不会刷新网页，而仅仅是替换你修改的部分
   // react-hot-loader 依赖 webpack-dev-server
   npm install webpack-dev-server react-hot-loader --save-dev



为什么要使用 webpack ？
webpack 是前端一个工具，可以让各个模块进行加载，预处理，再进行打包，它能有 Grunt 或 Gulp 所有基本功能。
优点如下：1、支持 commonJS 和 AMD 模块。2、支持很多模块加载器的调用，可以使模块加载器灵活定制，比如 babel-loader 
加载器，该加载器能够使我们使用 ES6 的语法来编写代码。3、可以通过配置打包成多个文件，有效的利用浏览器的缓存功能提升性能。
4、使用模块加载器，可以支持sass、less等处理器进行打包且支持静态资源样式及图片进行打包。



webpack 中，代码里面的 require 是webpack 提供的扩张项 ( require.js )
本地安装require不到全局的包，这是node的机制问题

package.js 中 'scripts' start 是 nodejs 中的一个关键词或者变量
如果想取其他的名字，需要使用 npm run test
package.json中的scripts属性可以用来简化指令，通过执行npm run-script来执行对应的指令。
 "scripts": {
    "test" : "webpack -p"
  }



Loaders 是 wepack 中最核心的功能。通过使用不同的loader，webpack通过调用外部脚本或工具可以对各种各样的格式
的文件进行处理，比如说分析JSON文件并把它转为JavaScript文件，或者说把下一代的JS文件(ES6、ES7)转为现在浏览器
可以识别的JS文件。或者说对React的开发而言，合适的Loaders可以把React的JSX文件转为JS文件






https://github.com/zwhu/blog/issues/17  Node.js 中 module.exports 和 exports 的区别


https://www.mmxiaowu.com/article/58482558d4352863efb55475  Vue2 dist 目录下各个文件的区别




参考
babel-polyfill、babel-plugin-transform-runtime
https://segmentfault.com/a/1190000006930013?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io#articleHeader5

https://segmentfault.com/q/1010000005596587  babel的polyfill和runtime的区别

https://segmentfault.com/a/1190000005742111  webpack进阶之loader篇

http://www.tuicool.com/articles/MruEni
关于 webpack-dev-middleware

对于 webpack-dev-middleware，最直观简单的理解就是一个运行于内存中的文件系统。
你定义了 webpack.config，webpack 就能据此梳理出所有模块的关系脉络，
而 webpack-dev-middleware 就在此基础上形成一个微型的文件映射系统，
每当应用程序请求一个文件——比如说你定义的某个 entry ，
它匹配到了就把内存中缓存的对应结果作为文件内容返回给你，反之则进入到下一个中间件。

因为是内存型的文件系统，所以 rebuilding 的速度非常快，
因此特别适合于开发阶段用作静态资源服务器；又因为 webpack 可以把任何一种资源都当作是模块来处理，
因此它完全可以取代其他的 HTTP 服务器。
事实上，大多数 webpack 用户用过的 webpack-dev-server
就是一个 express＋webpack-dev-middleware 的实现。
二者的区别仅在于 webpack-dev-server 是封装好的，
除了 webpack.config 和命令行参数之外，你很难去做定制型开发，
所以它是适合纯前端项目的辅助工具。
而 webpack-dev-middleware 是中间件，你可以编写自己的后端服务然后把它整合进来，
相对而言就自由得多了。我们做的是一个前后同构的应用，因此 webpack-dev-server 就不予考虑了。

http://www.cnblogs.com/nmxs/p/6206306.html   vue2.0 全配置注释

http://www.cnblogs.com/tugenhua0707/p/5576262.html#_labe2  webpack 构建

http://blog.csdn.net/code_for_free/article/details/51583737 webpack 优化

http://cnodejs.org/topic/58396960c71e606e36aed1db CommonsChunkPlugin 中的 manifest

http://react-china.org/t/webpack-output-filename-output-chunkfilename/2256  怎么理解webpack中的output.filename 和output.chunkFilename

http://www.cnblogs.com/libin-1/p/6596810.html   vue-cli中的webpack配置

http://www.tuicool.com/articles/nEJRri  Babel下的ES6兼容性与规范

http://www.ruanyifeng.com/blog/2016/01/babel.html  babel 教程，可以搜索 babel-polyfill 与 babel-runtime 阮一峰

https://segmentfault.com/q/1010000007401974?_ea=1337523  Webpack怎么加入babel-polyfill

https://segmentfault.com/a/1190000004944322  吐槽一下vue-loader，vue-loader 是一个加载器，能把如下格式的 Vue 组件转化成JavaScript模块。

http://www.cnblogs.com/lvyongbo/p/5953464.html  vue-loader

http://jiongks.name/blog/just-vue/  囧克斯 Vue + webpack 项目实践

https://www.mmxiaowu.com/article/58482558d4352863efb55475  Vue2 dist 目录下各个文件的区别

需要把importLoaders设置为2，也就是说：
{test: /.less$/, loader: 'style!css?importLoaders=2!autoprefixer!less'}
表明你在某个less文件中import进来的资源（其它的less文件）会被使用autoprefixer和less 这两个loader解析

如果按照你最开始的设置：
{test: /.less$/, loader: 'style!css?importLoaders=1!autoprefixer!less'}
表明你在某个less文件中import进来的资源（其它的less文件）只会被使用autoprefixer这一个loader解析，就会报错

webpack css loader中关于importLoaders的解释很不友好

https://www.zhihu.com/question/39814405/answer/83298261  webpack 的问题 重要












form 表单
http://react-component.github.io/form/
https://github.com/react-component/form#optiongetvaluefromevent
https://github.com/yiminghe/async-validator#rules

fetch 设置
http://www.open-open.com/lib/view/open1426815580164.html

// list 要使用 redux 的 state

Miscrosoft visio 破解，单位电脑有了 2003 的版本

https://segmentfault.com/a/1190000002909224  immutableA

http://zhenhua-lee.github.io/react/redux.html  必看 研究

http://zhenhua-lee.github.io/react/history.html  必看 研究

https://yq.aliyun.com/articles/3168  必看 研究 json 数据

http://www.cnblogs.com/geoffgu/p/6035910.html  必看 研究 react+redux渲染性能优化原理

https://github.com/lcxfs1991/blog/issues/8  必看 研究 性能优化 React移动web极致优化

http://yunlaiwu.github.io/blog/2016/12/01/react+redux+immutablejs/

修改表单后，检查 detail 取的数据是否是最新的，如果不是是否要更新 redux 中的state，或者加时间戳去拿最新的数据

https://github.com/guox191/antd-redux

http://humyang.github.io/2016/ciqzftaxp0000l735q59ah641/   react-router-redux 翻译

http://www.alloyteam.com/2016/02/code-split-by-routes/  require.ensure()

https://github.com/trix/nano  7行代码的库研究，最简单的mvc，字符串拼接

settings->keymap split 设置 ctrl + \

http://imweb.io/topic/57e73d2bf19a1ca363927b95  vscode

https://www.zhihu.com/question/33629737?rf=46426597  知乎 ant design

https://github.com/SimpleUI-Group/SimpleUI  vue ui 框架

https://segmentfault.com/a/1190000004660311  react-hot

http://www.cnblogs.com/zhuyang/p/5000154.html

http://blog.csdn.net/xiebaochun/article/details/51917580

https://segmentfault.com/a/1190000005866410  webpack 单页应用

http://www.tuicool.com/articles/yEnqqiV   一次 React+Redux 实践及思考

https://www.v2ex.com/t/274697  classnames 处理 React 最佳实践

http://stackoverflow.com/questions/37311972/react-doesnt-switch-to-production-mode  React doesn't switch to production mode

https://segmentfault.com/a/1190000004703040  搭建服务端

http://blog.csdn.net/z69183787/article/details/51934181  react 实践

https://github.com/jovey-zheng/react-start-kit

http://cnodejs.org/topic/5865a866189fd5ad6459006c  React.js服务端渲染开发环境

https://zhuanlan.zhihu.com/p/20799258?refer=jscss  react-router

https://segmentfault.com/a/1190000007141049  异步加载路由

http://stackoverflow.com/questions/36194806/invariant-violation-the-root-route-must-render-a-single-element-error-in-react  router

https://segmentfault.com/q/1010000006780456?_ea=1129773 打包异步 router

http://www.tuicool.com/articles/emayQ3  异步路由

https://segmentfault.com/a/1190000003810652#articleHeader2  fetch

http://www.tuicool.com/articles/M7NRr27 封装 fetch

https://github.com/matthew-andrews/isomorphic-fetch  isomorphic-fetch

http://blog.csdn.net/haihuan2004/article/details/52511042  fetch() cookie 身份验证

在Fetch请求里发送用户身份凭证信息
如果你想在fetch请求里附带cookies之类的凭证信息，可以将 credentials参数设置成 “include” 值。

fetch(url, {
  credentials: 'include'
})


https://github.com/github/fetch

https://www.npmjs.com/package/node-fetch

待研究：import NProgress from 'nprogress';  进度条加载 参考 cobish

class Element extends Component {

  componentDidMount = () => {
    fetch('url-xxx')
      .then(res => res.json())
      .then(this.setState({
        //...
      }););
  }

  render = () => {
    // return (...);
  }
}

https://github.com/js-cookie/js-cookie

https://segmentfault.com/a/1190000006716454  formData

https://github.com/ant-design/ant-design


redux 没那么复杂  就3个关键点就行
action 存放操作   reducer 存放方法
mapstatetoprops 转成props

{
    "presets": [ "es2015", "stage-0", "react"],
    "plugins": [["import", {
        "libraryName": "antd",
        "style": true
    }]]
}

  webpackConfig.babel.plugins.push('transform-runtime');
    webpackConfig.babel.plugins.push(['import', {
        libraryName: 'antd',
        style: 'css'
    }]);


https://github.com/springhack/TopMesssage  antd

https://segmentfault.com/a/1190000006727526    transform-decorators-legacy

http://blog.csdn.net/h416756139/article/details/51728485   React 移动 web 极致优化 transform-decorators-legacy

webpack-bundle-analyzer 研究下

flex 布局研究下

https://github.com/mzabriskie/axios

import axios from 'axios'
Vue.prototype.$http = axios

axios 处理 ajax
// 代码研究
app.use(config.commonPath.staticPath, function (req, res, next) {
    if (req.method.toUpperCase() == 'POST' && req.url.indexOf('.json') != -1) {
        var filePath = path.resolve(__dirname, '../static' + req.url);
        fs.readFile(filePath, function (err, contents) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(contents);
            res.end();
        });
    }
    else {
        next();
    }
});

https://segmentfault.com/q/1010000007908719  axios promise 兼容

http://babeljs.io/docs/usage/polyfill/  babel-polyfill 处理兼容 axios 的 promise

https://github.com/zloirock/core-js#commonjs  core-js

https://github.com/stefanpenner/es6-promise   es6-promise 兼容

http://ask.dcloud.net.cn/article/205  深入理解高度。获取屏幕、webview、软键盘高度 - DCloud问答

http://www.alloyteam.com/2016/03/using-react-to-write-a-simple-activity-pages-design-of-operating-system-article/  学习

https://github.com/luozhihao/react-antd-demo   antd demo

https://github.com/xianyulaodi/React-router  demo

https://github.com/yuyang041060120/react-reflux

https://github.com/reflux/refluxjs

http://www.cnblogs.com/lovesueee/p/4893218.html  reflux

http://www.cnblogs.com/chyingp/p/reflux-async-action.html  reflux 异步

http://www.cnblogs.com/lewis617/p/5129609.html   reflux 入门

https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207#.gnv1ltjlx  flux 理解

http://blog.krawaller.se/posts/the-reflux-data-flow-model/

reflux 结合 fetch

actions就是组件的动作，store用于执行actions的命令，并返回一个state对象给组件。组件通过state来更新界面。

import React,{ Component } from 'react';

class $VAR$ extends Component{
    render(){
        return (
            <div>
                $VAR$
            </div>
        )
    }
}

export default $VAR$

源码解析
http://blog.csdn.net/bgk083/article/details/50867365   redux学习笔记之<combineReducers源码解析>
 
http://www.cnblogs.com/chyingp/p/redux-source-insight.html  Redux系列x：源码解析

reselect ?
immutable ?

函数式编程、currying、数据范式

https://www.w3ctech.com/topic/1561  深入浅出 - Redux

http://react-china.org/t/react-redux-immutablejs/9948  React + Redux + Immutablejs开发总结

http://blog.csdn.net/fengyinchao/article/details/51566555  实例讲解基于 React+Redux 的前端开发流程

https://github.com/acdlite/redux-actions  react-action

https://github.com/acdlite/flux-standard-action  action 规范

http://www.tuicool.com/articles/yEnqqiV  一次 React+Redux 实践及思考

https://github.com/wxyyxc1992

https://github.com/fwon/blog-app  博客例子

https://github.com/liyatang/redux-async-actions-reducers 按需加载 reducers?

redux-actions？

https://github.com/acdlite/flux-standard-action  action 规范

优化 action reducer

路由处理

https://zhuanlan.zhihu.com/p/20799258?refer=jscss
http://react-china.org/t/react-router-hashhistory-browserhistory/6799/11
https://www.npmjs.com/package/history

故障处理

Webpack 的配置比较复杂，很容出现错误，下面是一些通常的故障处理手段。

一般情况下，webpack 如果出问题，会打印一些简单的错误信息，比如模块没有找到。我们还可以通过参数 --display-error-details 来打印错误详情。

https://segmentfault.com/a/1190000007294861  chunksSortMode































