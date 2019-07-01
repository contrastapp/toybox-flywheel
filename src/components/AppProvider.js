import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import App from '../containers/App';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
// const store = createStore(rootReducer, applyMiddleware(thunk));

import store from './store';

export default class AppProvider extends React.Component {
	render () {
		console.log(this.props);
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<App addToken={this.props.addToken} context={this.props.context} siteId={this.props.siteId}/>
				</ThemeProvider>
			</Provider>
		);
	}
}
