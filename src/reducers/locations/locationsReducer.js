import * as actions from './locationsActions'

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  locations: []
}

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOCATIONS_REQUEST_STARTED:
      return Object.assign({}, state, {
        loading: true
      })
    case actions.LOCATIONS_REQUEST_SUCCESS:
      return Object.assign({}, state, action.data, {
        loading: false,
        loaded: true
      })
    case actions.LOCATIONS_REQUEST_FAILURE:
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
