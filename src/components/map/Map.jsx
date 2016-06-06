import classes from './Map.scss'
import { GoogleMapLoader, GoogleMap, DirectionsService, DirectionsRenderer } from 'react-google-maps'
import { DirectionsHelper } from 'utils'

export default class Map extends React.Component {
  static propTypes = {
    locations: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    params: React.PropTypes.object
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
        console.log(x, i)
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

  renderGoogleMapElement() {
    const googleMapStyle = { height: `100%`, width: '100%' }

    return <GoogleMap
      containerProps={{ style: googleMapStyle }}
      defaultZoom={7}
      defaultCenter={null} >
        {this.renderDirections()}
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
