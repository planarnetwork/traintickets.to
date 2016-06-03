import { Map } from 'components'
import { locationsRequest } from 'reducers/locations/locationsActions'
import { directionsRequest } from 'reducers/directions/directionsActions'

const mapActionCreators = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => {
  return {
  locations: state.locations.locations,
  data: state.directions.directions}
}

export default ReactRedux.connect(mapStateToProps, mapActionCreators)(Map);
