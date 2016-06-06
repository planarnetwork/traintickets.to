import * as actions from './directionsActions'

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  directions: [],
  origin: null,
  destination: null,
  date: null
}

export default function directionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.DIRECTIONS_REQUEST_STARTED:
      return Object.assign({}, state, action.data, {
        loading: true,
        loaded: false
      })
    case actions.DIRECTIONS_REQUEST_SUCCESS:
      return Object.assign({}, state, action.data, {
        loading: false,
        loaded: true
      })
    case actions.DIRECTIONS_REQUEST_FAILURE:
      return Object.assign({}, state, action.data, {
        loading: false,
        loaded: false
      })
    default:
      return state
  }

  return state
}
