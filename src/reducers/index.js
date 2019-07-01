const initialState = {
	projects: [],
};

const actionsMap = {
	ADD_PROJECTS (state, action) {
		return { ...state, loading: true, projects: action.data.projects };
	},
	ADD_AUTH (state, action) {
		return { ...state, token: action.data.token, email: action.data.email, authed: true };
	},
	SIGN_OUT (state, action) {
		return { ...state, token: null, email: null, authed: false };
	},
};

export default function rootReducer (state = initialState, action) {
	const reduceFn = actionsMap[action.type];
	if (!reduceFn) {
		return state;
	}
	return reduceFn(state, action);
}
