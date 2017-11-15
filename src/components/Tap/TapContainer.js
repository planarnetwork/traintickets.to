import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Tap from './Tap';

const mapStateToProps = ({app: {outwardPrice, searchResult, passenger, route}},ownProps) => {
    return {
        outwardPrice,
        searchResult,
        passenger,
        route,
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

const TapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tap);

export default TapContainer;
