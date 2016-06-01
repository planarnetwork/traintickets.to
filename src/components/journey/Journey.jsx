import classes from './Journey.scss';
import { BlockCentered } from 'components'
import JourneyForm from './form/JourneyForm'
import Directions from './directions/Directions'
import { DataBindingHelper } from 'utils'

import { Button, Col, Glyphicon } from 'react-bootstrap';

export default class Journey extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    locations: React.PropTypes.shape({
      loaded: React.PropTypes.bool.isRequired,
      loading: React.PropTypes.bool.isRequired,
      error: React.PropTypes.any,
      locations: React.PropTypes.array.isRequired
    }),
    directions: React.PropTypes.shape({
      loaded: React.PropTypes.bool.isRequired,
      loading: React.PropTypes.bool.isRequired,
      error: React.PropTypes.any,
      directions: React.PropTypes.array.isRequired
    }),
    locationsRequest: React.PropTypes.func.isRequired,
    directionsRequest: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  componentWillMount() {
  }

  render() {
    const { className, locations, locationsRequest, directions, directionsRequest, dispatch, ...other } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.journey}>
        <JourneyForm
          { ...locations }
          locationsRequest={locationsRequest}
          dispatch={dispatch}
          className={classes.journeyForm} />
        <Directions
          { ...directions }
          directionsRequest={directionsRequest} />
      </section>
    )
  }
}
