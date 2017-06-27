import Axios from 'axios';
import {getUrlParam, jsonToParam} from '../../assets/utils';
import {PLATFORM} from '../../constants/enum';

Axios.defaults.timeout = 20000;

// http request 拦截器
Axios.interceptors.request.use(config => {
	// console.log(config);
	// 通常是用来拿到登入后的token，然后再 config.headers.Authorization 设置
	// 之后所有的请求都会带上
	// console.log('request', config);
	return config;
}, (error) => {
	console.log("错误的传参", 'fail');
	return Promise.reject(error);
});

// http response 拦截器
Axios.interceptors.response.use(response => response, error => {

	return Promise.reject(error.response || {
			status    : 408,
			statusText: '请求超时'
		});
});

const successsHandler = (result, msg, code) => {

	return Promise.resolve({
		result,
		msg,
		code
	});

};

const errorHandler = (status, statusText = '哎呀出错了', serverCode) => {

	return Promise.reject({
		status,
		statusText,
		serverCode
	});

};

export const fetch = ({url = '', method = 'get', data = {}} = {}) => {

	let headers = {
		...PLATFORM,
		custNo: sessionStorage.custNo || '',
	};

	data = {
		...data,
		bizModNo: getUrlParam('bizModNo') || ''
	};

	let opts = {url, method, headers, data};

	if (method.toLocaleUpperCase() === 'GET') {
		if (data) {
			opts.url = `${url}?${jsonToParam(data)}`;
		}
	}

	return Axios(url, opts).then(response => {

		let {data, status}    = response,
		    {resMsg, resCode} = data;

		if (data.success) {
			return successsHandler(data.result, resMsg, resCode);
		}

		return errorHandler(status, resMsg, resCode);

	}).catch(error => {

		let {status, statusText, serverCode} = error;

		return errorHandler(status, statusText, serverCode);

	});

};