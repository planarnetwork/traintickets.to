import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Search from './Search';

const mapStateToProps = ({app: {}}, ownProps) => {
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

const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default SearchContainer;
