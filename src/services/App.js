import { request } from './request';
import _ from 'lodash';

const API_URL = 'flywheel';

export default {
	signIn (email, token) {
		return request({
			method: 'GET',
			url: `${_.compact([API_URL]).join('/')}.json`,
			params: { email, token },
		});
	},
	getProjects () {
		return request({
			method: 'GET',
			url: `${_.compact([API_URL, 'projects']).join('/')}.json`,
		});
	},
};
