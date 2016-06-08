import classes from './Map.scss'
import { GoogleMapLoader, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from 'react-google-maps'
import { DirectionsHelper, LocationsHelper } from 'utils'

export default class Map extends React.Component {
  static propTypes = {
    locations: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    params: React.PropTypes.object
  };

  static defaultProps = {
    locations: []
  };

  setDirections(props) {
    if (_.isEmpty(props.locations) || _.isEmpty(props.data)) return;

    this.setState({
      directions: [],
      highlighted: []
    }, () => {
      const { locations, data, params } = props;
      const highlighted = params.expanded ? params.expanded * 1 : 0;

      const DirectionsService = new google.maps.DirectionsService();

      DirectionsHelper.iterateDirections(data, locations, highlighted, (directionData) => {
        const travelMode =
          directionData.mode == 'walk' ?
          google.maps.TravelMode.WALKING :
          google.maps.TravelMode.TRANSIT;

        let transitOptions = {};

        if (directionData.mode == 'train' || directionData.mode == 'tube') {
          transitOptions.modes = [google.maps.TransitMode.TRAIN]
        }
        else if (directionData.mode == 'bus') {
          transitOptions.modes = [google.maps.TransitMode.BUS]
        }

        DirectionsService.route({
          origin: new google.maps.LatLng(directionData.origin.lat, directionData.origin.lon),
          destination: new google.maps.LatLng(directionData.destination.lat, directionData.destination.lon),
          travelMode: travelMode,
          transitOptions: transitOptions
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: this.state.directions.concat(result),
              highlighted:
                directionData.highlighted ?
                this.state.highlighted.concat(this.state.directions.length) :
                this.state.highlighted
            });
          } else {
            console.error(`error fetching directions ${ result }`);
          }
        });
      });
    })
  }

  componentWillMount() {
    this.setDirections(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setDirections(newProps);
  }

  renderContainer() {
    return (
      <div {...this.props} className={classes.mapContainer} />
    )
  }

  renderDirections() {
    if (!this.state) return null;

    return _.map(
      //this.state.directions,
      _.filter(this.state.directions, (x, i) => _.contains(this.state.highlighted, i)),
      (x, i) => {
        return (
          <DirectionsRenderer
            key={i}
            directions={x}
            options={{ suppressMarkers: true, markerOptions: { opacity: 0 } }} />
        )
      },
      this
    );
  }

  renderMarkers() {
    const { origin, destination } = this.props.params;

    if (_.isEmpty(origin) || _.isEmpty(destination)) return null;

    const { locations } = this.props,
          originLocation = LocationsHelper.getByCode(this.props.locations, origin),
          destinationLocation = LocationsHelper.getByCode(this.props.locations, destination);

    if (_.isEmpty(originLocation) || _.isEmpty(destinationLocation)) return null;

    const originLatLon = new google.maps.LatLng(originLocation.lat, originLocation.lon),
          destinationLatLon = new google.maps.LatLng(destinationLocation.lat, destinationLocation.lon);

    return [
      (
      <Marker
        key={1}
        position={originLatLon}
        label={'A'} />
      ),
      (
      <Marker
        key={2}
        position={destinationLatLon}
        label={'B'} />
      )
    ]
  }

  renderGoogleMapElement() {
    const googleMapStyle = { height: `100%`, width: '100%' }

    return <GoogleMap
      containerProps={{ style: googleMapStyle }}
      defaultZoom={7}
      defaultCenter={null} >
        {this.renderDirections()}
        {this.renderMarkers()}
    </GoogleMap>
  }

  render() {
    const { children } = this.props;

    return (
      <section className={classes.mapWrapper}>
        <GoogleMapLoader
          containerElement={this.renderContainer()}
          googleMapElement={this.renderGoogleMapElement()} />

        {children}
      </section>
    );
  }
}
