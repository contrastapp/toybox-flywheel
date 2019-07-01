import thunk from 'redux-thunk';
import AppService from '../services/App';

export function addProjects (data) {
	return { type: 'ADD_PROJECTS', data };
}

export function addAuth (data) {
	return { type: 'ADD_AUTH', data };
}

export function signOut (data) {
	return { type: 'SIGN_OUT', data };
}

export function signIn (email, token) {
	return (dispatch) => AppService
		.signIn(email, token)
		.then((res) => {
			dispatch(addAuth({ email, token: res.data.token }));
			return res.data;
		})
		.catch((e) => {
			console.error(e);
		});
}

export function getProjects () {
	return (dispatch) => AppService
		.getProjects()
		.then((res) => {
			dispatch(addProjects(res.data));
			return res.data;
		})
		.catch((e) => {
			console.error(e);
		});
}
