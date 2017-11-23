import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Fares from './Fares';

const mapStateToProps = ({app: {outwardPrice, searchResult, passenger, route, loading, fares}},ownProps) => {
    return {
        outwardPrice,
        searchResult,
        passenger,
        route,
        loading,
        fares,
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
