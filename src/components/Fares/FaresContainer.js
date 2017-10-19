import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Fares from './Fares';

const mapStateToProps = ({app: {searchResult}},ownProps) => {
    return {
        searchResult,
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

const FaresContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Fares);

export default FaresContainer;
