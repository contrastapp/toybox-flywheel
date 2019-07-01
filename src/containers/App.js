import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions/index';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => ({
	...state,
	...ownProps,
});

function mapDispatchToProps (dispatch) {
	return {
  	actions: bindActionCreators(AppActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
