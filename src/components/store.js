import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';
const store = createStore(rootReducer, applyMiddleware(thunk, createLogger()));


export default store;
