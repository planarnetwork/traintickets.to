export const JOURNEY_FORM_DATA_REQUEST_STARTED = "JOURNEY_FORM_DATA_REQUEST_STARTED"
export function journeyFormDataRequestStarted() {
  return {
    type: JOURNEY_FORM_DATA_REQUEST_STARTED
  }
}

export const JOURNEY_FORM_DATA_REQUEST_SUCCESS = "JOURNEY_FORM_DATA_REQUEST_SUCCESS"
export function journeyFormDataRequestSuccess(data) {
  return {
    type: JOURNEY_FORM_DATA_REQUEST_SUCCESS,
    data: data
  }
}

export const JOURNEY_FORM_DATA_REQUEST_FAILURE = "JOURNEY_FORM_DATA_REQUEST_FAILURE"
export function journeyFormDataRequestFailure(error) {
  return {
    type: JOURNEY_FORM_DATA_REQUEST_FAILURE,
    error: error
  }
}

export const JOURNEY_FORM_DATA_REQUEST = "JOURNEY_FORM_DATA_REQUEST"
export function journeyFormDataRequest() {
  return (dispatch) => {
    dispatch(journeyFormDataRequestStarted());

    setTimeout(() => {
      dispatch(journeyFormDataRequestSuccess({
        autocompleteItems: ['A', 'B', 'C']
      }))
    }, 300);
  }
}
