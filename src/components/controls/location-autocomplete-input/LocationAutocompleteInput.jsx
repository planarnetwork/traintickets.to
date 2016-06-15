import classes from './LocationAutocompleteInput.scss'
import ValueLinkedComponent from 'components/controls/ValueLinkedComponent'
import Autosuggest from 'react-autosuggest'
import { LocationsHelper } from 'utils'

export default class LocationLocationAutocompleteInput extends ValueLinkedComponent {

  state = {
    autocompleteItemsVisible: false,
    selectedAutocompleteItem: null
  };

  static propTypes = {
    valueLink: React.PropTypes.shape({
        value: React.PropTypes.string.isRequired,
        requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,

    autocompleteItems: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string
  };

  static defaultProps = {
    placeholder: ''
  };

  onInputChange(e, data) {
    this.getValueLink().requestChange(e.target.value);
  }

  onInputKeyDown(e, data) {
    // tab key
    if(e.keyCode == 9) {
      const suggestions = LocationsHelper.find(this.props.autocompleteItems, e.target.value);
      if (suggestions.length) {
        const value = LocationsHelper.getStringValue(suggestions[0]);
        this.getValueLink().requestChange(value);
      }
    }
  }

  getSuggestions(value) {
    return LocationsHelper.find(this.props.autocompleteItems, value);
  }

  getSuggestionValue(suggestion) {
    return LocationsHelper.getStringValue(suggestion);
  }

  renderSuggestion(suggestion) {
    return (
      <span>
        <span className={classes.locationCode} >{suggestion.code}</span>
        <span className={classes.locationName} >{suggestion.name}</span>
      </span>
    );
  }

  onSuggestionSelected(e, data) {
    const { suggestion, suggestionValue, sectionIndex, method } = data;

    this.getValueLink().requestChange(this.getSuggestionValue(suggestion));
  }

  shouldRenderSuggestions(value) {
    return true;
  }

  render() {
    const { className, valueLink, value, onChange, autocompleteItems, placeholder, ...other } = this.props;

    const inputProps = {
      value: this.getValueLink().value,
      onChange: this.onInputChange.bind(this),
      placeholder: placeholder,
      onKeyDown: this.onInputKeyDown.bind(this)
    }

    const suggestions = this.getSuggestions(this.getValueLink().value);

    return (
      <Autosuggest
        className={className}
        suggestions={suggestions}
        getSuggestionValue={::this.getSuggestionValue}
        onSuggestionSelected={::this.onSuggestionSelected}
        shouldRenderSuggestions={::this.shouldRenderSuggestions}
        renderSuggestion={::this.renderSuggestion}
        inputProps={inputProps} />
    )
  }
}
