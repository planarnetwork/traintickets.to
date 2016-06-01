export const LOCATIONS_REQUEST_STARTED = "LOCATIONS_REQUEST_STARTED"
export function locationsRequestStarted() {
  return {
    type: LOCATIONS_REQUEST_STARTED
  }
}

export const LOCATIONS_REQUEST_SUCCESS = "LOCATIONS_REQUEST_SUCCESS"
export function locationsRequestSuccess(data) {
  return {
    type: LOCATIONS_REQUEST_SUCCESS,
    data: data
  }
}

export const LOCATIONS_REQUEST_FAILURE = "LOCATIONS_REQUEST_FAILURE"
export function locationsRequestFailure(error) {
  return {
    type: LOCATIONS_REQUEST_FAILURE,
    error: error
  }
}

export const LOCATIONS_REQUEST = "LOCATIONS_REQUEST"
export function locationsRequest() {
  return (dispatch) => {
    dispatch(locationsRequestStarted());

      fetch(require('static/data/locations.json'))
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          dispatch(locationsRequestSuccess({
            locations: json
          }))
        })
        .catch(function(ex) {
          dispatch(locationsRequestFailure({
            error: ex
          }))
        });
  }
}
