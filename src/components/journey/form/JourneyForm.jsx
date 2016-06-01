import classes from './JourneyForm.scss';
import { BlockCentered, LocationAutocompleteInput } from 'components'
import { DataBindingHelper } from 'utils'
import { push } from 'react-router-redux';

import { Button, Col, Glyphicon } from 'react-bootstrap';

export default class JourneyForm extends React.Component {
  constructor() {
    super();
  }

  state = {
    origin: '',
    destinition: ''
  }

  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.any,
    locations: React.PropTypes.array.isRequired,
    locationsRequest: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const { loaded, loading, locationsRequest } = this.props;

    if (!loaded && !loading) {
      locationsRequest();
    }
  }

  getJourneyUrl() {
    return '/journey/1/1/1'
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(push(this.getJourneyUrl()));
    return false;
  }

  render() {
    const { locations, className } = this.props;

    return (
      <form onSubmit={::this.onSubmit} className={className + ' ' + classes.journeyForm}>

        <div className={classes.origin}>

          <LocationAutocompleteInput
            valueLink={DataBindingHelper.linkWithState('origin', this)}
            autocompleteItems={locations}
            placeholder="Origin" />

          <Glyphicon className={classes.rightIcon} glyph="arrow-right" />

        </div>

        <div className={classes.destenition}>
          <LocationAutocompleteInput
            valueLink={DataBindingHelper.linkWithState('destinition', this)}
            autocompleteItems={locations}
            placeholder="Destinition" />
        </div>

        <div className={classes.goButton} >
          <Button type="submit" bsStyle="success">Go</Button>
        </div>

      </form>
    )
  }
}
