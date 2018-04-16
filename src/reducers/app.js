
import { rebaseData } from '../config/actionEvents';

const defaultState = {
    outwardPrice: 0,
    adults: 0,
    children: 0,
    searchResult: [],
    route: '',
    loading: false,
    fares: [],
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case rebaseData:
            return Object.assign({}, state, {[action.state.key]: action.state.value});
        default:
            return state;
    }
}