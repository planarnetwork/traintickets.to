import classes from './Home.scss';
import { BlockCentered, LocationAutocompleteInput } from 'components'
import { DataBindingHelper } from 'utils'
import JourneyForm from '../journey/form/JourneyForm';

export default class Home extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    locations: React.PropTypes.object.isRequired,
    locationsRequest: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  render() {
    const { locations, locationsRequest, dispatch, className } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.journeyFormPanel}>
        <JourneyForm {...locations} dispatch={dispatch} locationsRequest={locationsRequest} className={classes.journeyForm} />
      </section>
    )
  }
}
