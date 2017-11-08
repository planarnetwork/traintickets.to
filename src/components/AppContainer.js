import {connect} from 'react-redux';
import {rebaseDataFunc} from '../actions/index';

import App from './App';

const mapStateToProps = ({app: {searchResult}}, ownProps) => {
    return {
        searchResult,
        ...ownProps,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        rebaseData (key, value) {
            rebaseDataFunc(key, value)(dispatch);
        }
    }
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
