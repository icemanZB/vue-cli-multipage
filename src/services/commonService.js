import { fetch } from './fetch/index';
import { API } from './fetch/config';

/**
 * Common
 */
class CommonService {

	// 首页
	PrdIndex() {
		return fetch({
			url: API.Index
		});
	}

}

export default new CommonService();
