import { Journey } from 'components'
import { locationsRequest } from 'reducers/locations/locationsActions'
import { directionsRequest } from 'reducers/directions/directionsActions'

const mapActionCreators = (dispatch) => ({
  locationsRequest: () => dispatch(locationsRequest()),
  directionsRequest: (origin, destination, date) => dispatch(directionsRequest(origin, destination, date)),
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  locations: { ...state.locations },
  directions: { ...state.directions }
})

export default ReactRedux.connect(mapStateToProps, mapActionCreators)(Journey)
