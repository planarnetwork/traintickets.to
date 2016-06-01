import { Home } from 'components'
import { locationsRequest } from 'reducers/locations/locationsActions'

const mapActionCreators = (dispatch) => ({
  locationsRequest: () => dispatch(locationsRequest()),
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  locations: { ...state.locations }
})

export default ReactRedux.connect(mapStateToProps, mapActionCreators)(Home)
