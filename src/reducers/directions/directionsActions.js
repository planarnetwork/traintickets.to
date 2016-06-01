export const DIRECTIONS_REQUEST_STARTED = "DIRECTIONS_REQUEST_STARTED"
export function directionsRequestStarted() {
  return {
    type: DIRECTIONS_REQUEST_STARTED
  }
}

export const DIRECTIONS_REQUEST_SUCCESS = "DIRECTIONS_REQUEST_SUCCESS"
export function directionsRequestSuccess(data) {
  return {
    type: DIRECTIONS_REQUEST_SUCCESS,
    data: data
  }
}

export const DIRECTIONS_REQUEST_FAILURE = "DIRECTIONS_REQUEST_FAILURE"
export function directionsRequestFailure(error) {
  return {
    type: DIRECTIONS_REQUEST_FAILURE,
    error: error
  }
}

export const DIRECTIONS_REQUEST = "DIRECTIONS_REQUEST"
export function directionsRequest() {
  return (dispatch) => {
    dispatch(directionsRequestStarted());

      fetch(require('static/data/directions.json'))
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          dispatch(directionsRequestSuccess({
            autocompleteItems: json
          }))
        })
        .catch(function(ex) {
          dispatch(directionsRequestFailure({
            error: ex
          }))
        });
  }
}
