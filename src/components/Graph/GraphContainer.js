import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Graph from './Graph';

const mapStateToProps = (ownProps) => {
    return {
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

const GraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Graph);

export default GraphContainer;
