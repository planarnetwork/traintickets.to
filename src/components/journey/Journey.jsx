import classes from './Journey.scss';
import JourneyForm from './form/JourneyForm'
import Directions from './directions/Directions'
import { push } from 'react-router-redux';

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
    dispatch: React.PropTypes.func.isRequired,
    params: React.PropTypes.shape({
      origin: React.PropTypes.string.isRequired,
      destination: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      expanded: React.PropTypes.string
    })
  };

  expandDirection(index) {
    const { origin, destination } = this.props.params;

    const newUrl = encodeURI('/journey/' + origin + '/' + destination + '/1/' + index);

    this.props.dispatch(push(newUrl));
  }

  componentWillMount() {
  }

  render() {
    const { className, locations, locationsRequest, directions, directionsRequest, dispatch, params, ...other } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.journey}>
        <JourneyForm
          { ...locations }
          locationsRequest={locationsRequest}
          dispatch={dispatch}
          className={classes.journeyForm}
          defaultOrigin={params.origin}
          defaultDestination={params.destination}
          defaultDate={params.date} />
        <Directions
          className={classes.directions}
          { ...directions }
          locations={locations.locations}
          directionsRequest={directionsRequest}
          expandDirection={::this.expandDirection}
          dispatch={dispatch}
          expanded={params.expanded || '0'} />
      </section>
    )
  }
}
