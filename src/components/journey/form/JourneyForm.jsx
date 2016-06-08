import classes from './JourneyForm.scss';
import moment from 'moment';
import DateInput from 'components/controls/date-input/DateInput'
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
    destination: null,
    date: null
  }

  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.any,
    locations: React.PropTypes.array.isRequired,
    locationsRequest: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    defaultOrigin: React.PropTypes.string,
    defaultDestination: React.PropTypes.string,
    defaultDate: React.PropTypes.string
  };

  static defaultProps = {
    defaultOrigin: null,
    defaultDestenition: null,
    defaultDate: null
  };

  getJourneyUrl(origin, destination, date) {
    return encodeURI(`/journey/${origin}/${destination}/${date}`);
  }

  setDefaultData(props) {
    const { defaultOrigin, defaultDestination, defaultDate, locations } = props;

    let origin = defaultOrigin || '',
        destination = defaultDestination || '',
        date = defaultDate || '';

    this.setState({
      origin: LocationsHelper.getNameByCode(locations, origin),
      destination: LocationsHelper.getNameByCode(locations, destination),
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let origin = null,
        originValue = this.state.origin,
        destination = null,
        destinationValue = this.state.destination,
        date = this.state.date || '';

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
      destination: destinationValue,
      date: date
    }, () => {
      if (_.isEmpty(origin) || _.isEmpty(destination) || !moment(date).isValid()) {
        return;
      }

      this.props.dispatch(push(this.getJourneyUrl(origin, destination, date)));
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

  onDateChange(value) {
    debugger;
  }

  render() {
    const { locations, className } = this.props;

    const origin = DataBindingHelper.linkWithState('origin', this),
          destination = DataBindingHelper.linkWithState('destination', this),
          date = DataBindingHelper.linkWithState('date', this);

    return (
      <form onSubmit={::this.onSubmit} className={className + ' ' + classes.journeyForm}>

        <figure className={classes.locationInputs} >
          <CustomIcon className={classes.locationIcon} name="origin-destination" />

          <div className={classes.origin}>
            <LocationAutocompleteInput
              {...origin}
              autocompleteItems={locations}
              placeholder="Origin" />
          </div>

          <div className={classes.destination}>
            <LocationAutocompleteInput
              {...destination}
              autocompleteItems={locations}
              placeholder="Destinition" />
          </div>
        </figure>

        <div className={classes.submitAndDate} >
          <DateInput
            {...date} />
          <button className={classes.submit} type="submit" >Go</button>
        </div>

      </form>
    )
  }
}
