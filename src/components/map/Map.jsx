import classes from './Map.scss'
import { GoogleMapLoader, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from 'react-google-maps'
import { DirectionsHelper, LocationsHelper, geolocation } from 'utils'

const londonLatLon = new google.maps.LatLng(51.5085300, -0.1257400);
let requestId = 0;

export default class Map extends React.Component {
  state = {
    defaultCenter: londonLatLon
  };

  static propTypes = {
    locations: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    params: React.PropTypes.object
  };

  static defaultProps = {
    locations: []
  };

  iterateDirections(requestId, locations, data, params) {
    const highlighted = params.expanded ? params.expanded * 1 : 0;

    DirectionsHelper.iterateDirections(data, locations, highlighted, this.requestDirection.bind(this, requestId));
  }

  requestDirection(requestId, directionData) {
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
    else if (directionData.mode == 'metro') {
      transitOptions.modes = [google.maps.TransitMode.SUBWAY]
    }

    const DirectionsService = new google.maps.DirectionsService();

    const requestRoute = () => {
      if (this.state.requestId != requestId) return;

      DirectionsService.route({
        origin: new google.maps.LatLng(directionData.origin.lat, directionData.origin.lon),
        destination: new google.maps.LatLng(directionData.destination.lat, directionData.destination.lon),
        travelMode: travelMode,
        transitOptions: transitOptions
      }, (result, status) => {

        if (this.state.requestId != requestId) return;

        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: this.state.directions.concat(result),
            highlighted:
              directionData.highlighted ?
              this.state.highlighted.concat(this.state.directions.length) :
              this.state.highlighted
          });
        }
        else {
          if (status == 'OVER_QUERY_LIMIT') {
            setTimeout(requestRoute, 1000);
          }
          else {
            console.error(`error fetching directions ${ status }`);
          }
        }
      });
    }

    if (directionData.highlighted) {
      requestRoute();
    }
  }

  setDirections(props) {
    if (_.isEmpty(props.locations) || _.isEmpty(props.data)) return;

    this.setState({
      directions: [],
      highlighted: [],
      requestId: requestId
    }, this.iterateDirections.bind(this, requestId, props.locations, props.data, props.params));

    requestId += 1;
  }

  getOriginAndDestinitionLocations() {
    const { origin, destination } = this.props.params;

    if (_.isEmpty(origin) || _.isEmpty(destination)) return null;

    const { locations } = this.props,
          originLocation = LocationsHelper.getByCode(this.props.locations, origin),
          destinationLocation = LocationsHelper.getByCode(this.props.locations, destination);

    if (_.isEmpty(originLocation) || _.isEmpty(destinationLocation)) return null;

    const originLatLon = new google.maps.LatLng(originLocation.lat, originLocation.lon),
          destinationLatLon = new google.maps.LatLng(destinationLocation.lat, destinationLocation.lon);

    return { origin: originLatLon, destination: destinationLatLon }
  }

  componentWillMount() {
    this.setDirections(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setDirections(newProps);

    const { locations, params } = newProps;

    if (locations.length && _.isEmpty(params.origin)) {
      geolocation.getCurrentPosition((position) => {
        const location = LocationsHelper.findClosestLocation(locations, position.coords.latitude, position.coords.longitude);
        this.setState({
          defaultCenter: new google.maps.LatLng(location.lat, location.lon)
        })
      }, (reason) => {
        console.log(reason);
      });
    }
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
            options={{ suppressMarkers: true, markerOptions: { opacity: 0 }, preserveViewport: true }} />
        )
      },
      this
    );
  }

  renderMarkers(originDestinitionLocations) {
    if (!originDestinitionLocations) return null;

    return [
      (
      <Marker
        key={1}
        position={originDestinitionLocations.origin}
        label={'A'} />
      ),
      (
      <Marker
        key={2}
        position={originDestinitionLocations.destination}
        label={'B'} />
      )
    ]
  }

  renderGoogleMapElement() {
    const googleMapStyle = { height: `100%`, width: '100%' }
    const originDestinitionLocations = this.getOriginAndDestinitionLocations();

    return <GoogleMap
      containerProps={{ style: googleMapStyle }}
      zoom={9}
      center={originDestinitionLocations ? originDestinitionLocations.origin : this.state.defaultCenter}
      options={{ mapTypeControl: false, panControl: false, streetViewControl: false }} >
        {this.renderDirections()}
        {this.renderMarkers(originDestinitionLocations)}
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
