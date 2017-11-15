import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Loader from './Loader';

const mapStateToProps = ({app: {loading}},ownProps) => {
    return {
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

const LoaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loader);

export default LoaderContainer;
