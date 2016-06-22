import classes from './Map.scss'
import { GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer, Polyline } from 'react-google-maps'
import { DirectionsHelper, LocationsHelper, geolocation } from 'utils'

const londonLatLon = new google.maps.LatLng(51.5085300, -0.1257400);
let requestId = 0;

export default class Map extends React.Component {
  state = {
    defaultCenter: londonLatLon,
    shouldRenderMap: true
  };

  static propTypes = {
    locations: React.PropTypes.array.isRequired,
    data: React.PropTypes.any.isRequired,
    params: React.PropTypes.object
  };

  static defaultProps = {
    locations: []
  };

  iterateDirections(requestId, locations, data, params) {
    const highlighted = params.expanded ? params.expanded * 1 : 0;

    DirectionsHelper.iterateDirections(
      data,
      locations,
      highlighted,
      directionData =>
        DirectionsHelper.requestDirectionsFromGoogle(
          requestId,
          directionData,
          (directionData, result) => this.setState({
            directions: this.state.directions.concat(result),
            highlighted:
              directionData.highlighted ?
              this.state.highlighted.concat(this.state.directions.length) :
              this.state.highlighted
          }),
          () => this.state.requestId));
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

  onResize = function() {
    const { shouldRenderMap } = this.state;

    if(window.innerWidth < 768 && shouldRenderMap) {
      this.setState({ shouldRenderMap: false })
    }
    else if (window.innerWidth >= 768 && !shouldRenderMap) {
      this.setState({ shouldRenderMap: true })
    }
  }.bind(this);

  componentWillMount() {
    this.setDirections(this.props);
    window.addEventListener('resize', this.onResize, true);
    this.onResize();
  }

  componentWillReceiveProps(newProps) {
    setTimeout(() => this.setDirections(newProps), 300);

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

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, true);
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
          <Polyline
            key={i}
            path={x.routes[0].overview_path}
            options={{ strokeColor: '#3367d6', strokeWeight: 4 }} />
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
    const googleMapStyle = { height: `100%`, width: '100%' },
          originDestinitionLocations = this.getOriginAndDestinitionLocations(),
          defaultCenter = originDestinitionLocations ? originDestinitionLocations.origin : this.state.defaultCenter,
          mapComponent = this.refs.mapComponent;

    let center = defaultCenter

    if (mapComponent && mapComponent.props.center) {
      center = mapComponent.props.defaultCenter.lat() != defaultCenter.lat() ||
               mapComponent.props.defaultCenter.lng() != defaultCenter.lng() ?
               defaultCenter : mapComponent.getCenter();
    }

    return <GoogleMap
      ref="mapComponent"
      containerProps={{ style: googleMapStyle }}
      defaultZoom={9}
      defaultCenter={defaultCenter}
      center={center}
      options={{ mapTypeControl: false, panControl: false, streetViewControl: false }} >
        {this.renderDirections()}
        {this.renderMarkers(originDestinitionLocations)}
    </GoogleMap>
  }

  render() {
    const { children } = this.props,
          { shouldRenderMap } = this.state;

    return (
      <section className={classes.mapWrapper}>
        { shouldRenderMap && (
          <GoogleMapLoader
            containerElement={this.renderContainer()}
            googleMapElement={this.renderGoogleMapElement()} />
        )}

        {children}
      </section>
    );
  }
}
