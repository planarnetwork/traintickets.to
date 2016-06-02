import classes from './JourneyForm.scss';
import BlockCentered from 'components/layout/block-centered/BlockCentered'
import LocationAutocompleteInput from 'components/controls/location-autocomplete-input/LocationAutocompleteInput'
import CustomIcon from 'components/controls/icon/CustomIcon'
import { DataBindingHelper, LocationsHelper } from 'utils'
import { push } from 'react-router-redux';

export default class JourneyForm extends React.Component {
  constructor() {
    super();
  }

  state = {
    origin: null,
    destination: null
  }

  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.any,
    locations: React.PropTypes.array.isRequired,
    locationsRequest: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    defaultOrigin: React.PropTypes.string,
    defaultDestination: React.PropTypes.string
  };

  static defaultProps = {
    defaultOrigin: null,
    defaultDestenition: null
  };

  getJourneyUrl(origin, destination) {
    return encodeURI(`/journey/${origin}/${destination}/1`);
  }

  setDefaultData(props) {
    const { defaultOrigin, defaultDestination, locations } = props;

    let origin = defaultOrigin || '',
        destination = defaultDestination || '';

    this.setState({
      origin: LocationsHelper.getNameByCode(locations, origin),
      destination: LocationsHelper.getNameByCode(locations, destination)
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let origin = null,
        originValue = this.state.origin,
        destination = null,
        destinationValue = this.state.destination;

    const originSuggestions = LocationsHelper.find(this.props.locations, originValue);
    if (originSuggestions.length) {
      originValue = LocationsHelper.getStringValue(originSuggestions[0]);
      origin = originSuggestions[0].code;
    }

    const destinationSuggestions = LocationsHelper.find(this.props.locations, destinationValue);
    if (destinationSuggestions.length) {
      destinationValue = LocationsHelper.getStringValue(destinationSuggestions[0]);
      destination = destinationSuggestions[0].code;
    }

    this.setState({
      origin: originValue,
      destination: destinationValue
    }, () => {
      if (_.isEmpty(origin) || _.isEmpty(destination)) {
        return;
      }

      this.props.dispatch(push(this.getJourneyUrl(origin, destination)));
    })
  }

  componentWillMount() {
    const { loaded, loading, locationsRequest } = this.props;

    if (!loaded && !loading) {
      locationsRequest();
    }

    this.setDefaultData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultData(nextProps);
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

          <CustomIcon className={classes.rightIcon} name="arrow-right" />

        </div>

        <div className={classes.destination}>
          <LocationAutocompleteInput
            valueLink={DataBindingHelper.linkWithState('destination', this)}
            autocompleteItems={locations}
            placeholder="Destinition" />
        </div>

        <div className={classes.goButton} >
          <button type="submit" >Go</button>
        </div>

      </form>
    )
  }
}
