import {connect} from 'react-redux';

import { rebaseDataFunc } from '../../actions/index';
import Map from './Map';

const mapStateToProps = (app, ownProps) => {
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

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);

export default MapContainer;
