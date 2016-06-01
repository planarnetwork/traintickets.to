import { JourneyForm } from 'components'
import { locationsRequest } from 'reducers/locations/locationsActions'

const mapActionCreators = (dispatch) => ({
  locationsRequest: () => dispatch(locationsRequest())
})

const mapStateToProps = (state) => ({
  ...state.locations
})

export default ReactRedux.connect(mapStateToProps, mapActionCreators)(JourneyForm)
