import classes from './LocationAutocompleteInput.scss'
import ValueLinkedComponent from '../ValueLinkedComponent'
import Autosuggest from 'react-autosuggest';

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

  onInputChange(e) {
    this.getValueLink().requestChange(e.target.value);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : _.filter(this.props.autocompleteItems, x =>
      x.name.toLowerCase().slice(0, inputLength) === inputValue
      || x.code.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.name + '(' + suggestion.code + ')';
  }

  renderSuggestion(suggestion) {
    return (
      <span>{this.getSuggestionValue(suggestion)}</span>
    );
  }

  onSuggestionSelected(e, data) {
    const { suggestion, suggestionValue, sectionIndex, method } = data;

    this.getValueLink().requestChange(this.getSuggestionValue(suggestion));
  }

  render() {
    const { className, valueLink, value, onChange, autocompleteItems, placeholder, ...other } = this.props;

    const inputProps = {
      value: this.getValueLink().value,
      onChange: this.onInputChange.bind(this),
      placeholder: placeholder
    }

    const suggestions = this.getSuggestions(this.getValueLink().value);

    return (
      <Autosuggest
        className={className}
        suggestions={suggestions}
        getSuggestionValue={::this.getSuggestionValue}
        onSuggestionSelected={::this.onSuggestionSelected}
        renderSuggestion={::this.renderSuggestion}
        inputProps={inputProps} />
    )
  }
}
