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

  componentWillMount() {
    const { loaded, loading, journeyFormDataRequest } = this.props;

    if (!loaded && !loading) {
      journeyFormDataRequest();
    }
  }

  render() {
    const { autocompleteItems } = this.props;

    return (
      <BlockCentered className={classes.journeyFormPanel}>
        <BlockCentered>
          <form className={classes.journeyForm}>
            <Col sm={5}>
              <LocationAutocompleteInput valueLink={DataBindingHelper.linkWithState('origin', this)} autocompleteItems={autocompleteItems} />
            </Col>
            <Col sm={1}>
              <Glyphicon className={classes.rightIcon} glyph="arrow-right" />
            </Col>
            <Col sm={5}>
              <LocationAutocompleteInput valueLink={DataBindingHelper.linkWithState('destinition', this)} onChange={() => {}} autocompleteItems={autocompleteItems} />
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
