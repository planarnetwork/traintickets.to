import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Main from './Main';

const mapStateToProps = ({app: {searchResult, loading}}, ownProps) => {
    return {
        searchResult,
        loading,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        rebaseData (key, value) {
            rebaseDataFunc(key, value)(dispatch);
        },
    }
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default MainContainer;
