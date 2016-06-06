import config from 'app.config'

export const DIRECTIONS_REQUEST_STARTED = "DIRECTIONS_REQUEST_STARTED"
export function directionsRequestStarted(data) {
  return {
    type: DIRECTIONS_REQUEST_STARTED,
    data: data
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
export function directionsRequestFailure(data) {
  return {
    type: DIRECTIONS_REQUEST_FAILURE,
    data: data
  }
}

export const DIRECTIONS_REQUEST = "DIRECTIONS_REQUEST"
export function directionsRequest(origin, destination, date) {
  return (dispatch) => {
    dispatch(directionsRequestStarted({
      origin: origin,
      destination: destination,
      date: date,
      error: null
    }));

    fetch(`${config.directionsUrl}?origin=${origin}&destination=${destination}&date=${date}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(directionsRequestSuccess({
          directions: json,
          origin: origin,
          destination: destination,
          date: date,
          error: null
        }))
      })
      .catch(function(ex) {
        dispatch(directionsRequestFailure({
          error: ex,
          origin: origin,
          destination: destination,
          date: date
        }))
      });
  }
}
