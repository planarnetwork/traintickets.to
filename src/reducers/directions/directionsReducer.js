import * as actions from './directionsActions'

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  directions: []
}

export default function directionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.DIRECTIONS_REQUEST_STARTED:
      return Object.assign({}, state, {
        loading: true
      })
    case actions.DIRECTIONS_REQUEST_SUCCESS:
      return Object.assign({}, state, action.data, {
        loading: false,
        loaded: true
      })
    case actions.DIRECTIONS_REQUEST_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: actions.error,
        loaded: false
      })
    default:
      return state
  }

  return state
}
