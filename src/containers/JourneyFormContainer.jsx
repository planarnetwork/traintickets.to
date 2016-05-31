import { JourneyForm } from 'components'
import { journeyFormDataRequest } from 'reducers/journey-form/journeyFormActions'

const mapActionCreators = (dispatch) => ({
  journeyFormDataRequest: () => dispatch(journeyFormDataRequest())
})

const mapStateToProps = (state) => ({
  ...state.journeyForm
})

export default ReactRedux.connect(mapStateToProps, mapActionCreators)(JourneyForm)
