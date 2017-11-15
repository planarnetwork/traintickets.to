import update from 'immutability-helper';

import { rebaseData } from '../config/actionEvents';

const defaultState = {
    outwardPrice: 0,
    passenger: 0,
    searchResult: [],
    route: '',
    loading: false,
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case rebaseData:
            return update(state, {[action.state.key]: {$set: action.state.value}});
        default:
            return state;
    }
}