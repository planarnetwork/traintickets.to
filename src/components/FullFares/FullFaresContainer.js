import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import FullFares from './FullFares';

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

const FullFaresContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FullFares);

export default FullFaresContainer;
