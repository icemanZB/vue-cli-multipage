// url编码
export const encode = window.encodeURIComponent;
export const decode = window.decodeURIComponent;

// 获取url参数
export const getUrlParam = (key, search) => {
	let match = (search || location.search).match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
	return match ? decode(match[1]) : null;
};

// json转url参数
export const jsonToParam = json => {
	return Object.keys(json).map(key => {
		let value = !json[key] && typeof json[key] !== 'number' ? '' : json[key];
		return `${encode(key)}=${encode(value)}`;
	}).join('&');
};

// 数字格式化
export const formatNumber = (num, fractionDigits = 2, suffix = '', trimInt = true) => {
	num = parseFloat(num);

	if (isNaN(num)) {
		return '';
	}
	num = num.toFixed(fractionDigits);

	if (trimInt && parseInt(num) == num) {
		num = parseInt(num);
	}

	if (suffix) {
		return num + suffix;
	}
	else {
		return num;
	}
};

// 日期格式化
export const shortDateFormat = 'YYYY-MM-DD';
export const longDateFormat = 'YYYY-MM-DD hh:mm:ss';
export const dateFormat = (date, format = shortDateFormat) => {
	if (date) {
		if (typeof date === 'string') {
			date = date.replace(/-/g, '/');
		}
		date = new Date(date);
		if (date.toString() === 'Invalid Date') {
			return date.toString();
		}
		let zerofill = val => val >= 10 ? val : '0' + val;
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		return format.replace('YYYY', year).replace('MM', zerofill(month)).replace('DD', zerofill(day)).replace('hh', zerofill(hours)).replace('mm', zerofill(minutes)).replace('ss', zerofill(seconds))
			;
	} else {
		return date;
	}
};

// 手机号掩码
export const mobileAsterisk = mobile => (mobile || '').toString().replace(/(\d{3})\d{4}/, '$1****');

// 字符串截断
export const clamp = (str, len = 48) => {
	let temp,
	    icount = 0,
	    patrn  = /[^\x00-\xff]/,
	    strre  = '';
	for (let i = 0; i < str.length; i++) {
		if (icount < len - 1) {
			temp = str.substr(i, 1);
			icount = patrn.exec(temp) == null ? icount + 1 : icount + 2;
			strre += temp;
		} else {
			break;
		}
	}

	return icount < len ? strre : strre + '...';
};

// 字符连接
export const textConcat = (texts = [], confix = ' - ') => (texts || []).filter(item => !!item).join(confix);

// 数组去重
export const unique = (array) => {
	let r = [];
	for (let i = 0, len = array.length; i < len; i++) {
		for (let j = i + 1; j < len; j++) {
			if (array[i] === array[j]) {
				j = ++i;
			}
		}
		r.push(array[i]);
	}
	return r;
};