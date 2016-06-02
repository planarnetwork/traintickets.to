import classes from './JourneyForm.scss';
import { BlockCentered, LocationAutocompleteInput, CustomIcon } from 'components'
import { DataBindingHelper } from 'utils'
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

  getJourneyUrl() {
    return encodeURI('/journey/' + this.state.origin + '/' + this.state.destination + '/1')
  }

  setDefaultData(props) {
    const { defaultOrigin, defaultDestination } = props;

    let origin = defaultOrigin || '',
        destination = defaultDestination || '';

    this.setState({
      origin: origin,
      destination: destination
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.state.origin.length || !this.state.destination.length) {
      return;
    }

    this.props.dispatch(push(this.getJourneyUrl()));
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
