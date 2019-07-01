import requestA from 'axios';
import store from '../components/store';

export function request (params) {
	let baseUrl = 'https://app.toyboxsystems.com';

	// if (process.env.NODE_ENV === 'development') {
	//   baseUrl = 'http://localhost:3001';
	// } else if (process.env.NODE_ENV === 'staging') {
	//   baseUrl = 'https://toybox-staging.herokuapp.com';
	// } else {
	//   baseUrl = 'https://app.toyboxsystems.com';
	// }


	baseUrl += '/api/';

	params.params = params.params || {};

	const auth = params.params;
	const state = store.getState();
	const username = state.email || auth.email;
	const token = state.token || auth.token;

	const basicAuth = `Basic ${btoa(`${username}:${token}`)}`;

	return requestA({
		responseType: 'json',
		headers: { Authorization: basicAuth },
		...params,
		url: baseUrl + params.url,
	});
}

