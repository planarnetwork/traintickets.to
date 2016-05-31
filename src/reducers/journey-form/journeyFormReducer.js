import * as actions from './journeyFormActions'

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  autocompleteItems: []
}

export default function journeyFormReducer(state = initialState, action) {
  switch (action.type) {
    case actions.JOURNEY_FORM_DATA_REQUEST_STARTED:
      return Object.assign({}, state, {
        loading: true
      })
    case actions.JOURNEY_FORM_DATA_REQUEST_SUCCESS:
      return Object.assign({}, state, action.data, {
        loading: false,
        loaded: true
      })
    case actions.JOURNEY_FORM_DATA_REQUEST_FAILURE:
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
