import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Total from './Total';

const mapStateToProps = ({app: {outwardPrice, searchResult, adults, children, route}},ownProps) => {
    return {
        outwardPrice,
        searchResult,
        adults,
        children,
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

const TotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Total);

export default TotalContainer;
