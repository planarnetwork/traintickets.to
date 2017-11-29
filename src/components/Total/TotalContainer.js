import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import TotalTable from './TotalTable';

const mapStateToProps = ({app},ownProps) => {
    return {
        ...app,
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
)(TotalTable);

export default TotalContainer;
