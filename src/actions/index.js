import { rebaseData } from '../config/actionEvents';

export function rebaseDataFunc (key, value, activeCase) {
    return dispatch => {
        dispatch({
            type: rebaseData,
            state: {
                key,
                value
            },
            payload: activeCase
        })
    }
}