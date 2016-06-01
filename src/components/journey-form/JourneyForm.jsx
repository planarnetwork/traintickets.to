import classes from './JourneyForm.scss';
import { BlockCentered, LocationAutocompleteInput } from 'components'
import { DataBindingHelper } from 'utils'

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
    locationsRequest: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const { loaded, loading, locationsRequest } = this.props;

    if (!loaded && !loading) {
      locationsRequest();
    }
  }

  render() {
    const { locations, className } = this.props;

    return (
      <BlockCentered className={(className || '') + ' ' + classes.journeyFormPanel}>
        <BlockCentered>
          <form className={classes.journeyForm}>
            <Col sm={5}>
              <LocationAutocompleteInput valueLink={DataBindingHelper.linkWithState('origin', this)} autocompleteItems={locations} />
            </Col>
            <Col sm={1}>
              <Glyphicon className={classes.rightIcon} glyph="arrow-right" />
            </Col>
            <Col sm={5}>
              <LocationAutocompleteInput valueLink={DataBindingHelper.linkWithState('destinition', this)} onChange={() => {}} autocompleteItems={locations} />
            </Col>
            <Col sm={1} >
              <Button className={classes.goButton} bsStyle="success">Go</Button>
            </Col>
          </form>
        </BlockCentered>
      </BlockCentered>
    )
  }
}
