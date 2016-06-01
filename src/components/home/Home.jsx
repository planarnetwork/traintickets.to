import classes from './Home.scss';
import { BlockCentered, LocationAutocompleteInput } from 'components'
import { DataBindingHelper } from 'utils'
import JourneyForm from '../journey/form/JourneyForm';

import { Button, Col, Glyphicon } from 'react-bootstrap';

export default class Home extends React.Component {
  constructor() {
    super();
  }

  state = {
    origin: '',
    destinition: ''
  }

  static propTypes = {
    locations: React.PropTypes.object.isRequired,
    locationsRequest: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  render() {
    const { locations, locationsRequest, dispatch, className } = this.props;

    return (
      <BlockCentered className={(className || '') + ' ' + classes.journeyFormPanel}>
        <BlockCentered>
          <JourneyForm {...locations} dispatch={dispatch} locationsRequest={locationsRequest} className={classes.journeyForm} />
        </BlockCentered>
      </BlockCentered>
    )
  }
}
