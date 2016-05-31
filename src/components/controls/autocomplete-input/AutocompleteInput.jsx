import classes from './AutocompleteInput.scss'
import ValueLinkedComponent from '../ValueLinkedComponent'
import Autosuggest from 'react-autosuggest';

export default class AutocompleteInput extends ValueLinkedComponent {

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

    autocompleteItems: React.PropTypes.array.isRequired
  };

  onInputChange(e) {
    this.getValueLink().requestChange(e.target.value);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : _.filter(this.props.autocompleteItems, x =>
      x.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }

  onSuggestionSelected(e, data) {
    const { suggestion, suggestionValue, sectionIndex, method } = data;

    this.getValueLink().requestChange(suggestionValue);
  }

  render() {
    const { className, valueLink, value, onChange, autocompleteItems, ...other } = this.props;

    const inputProps = {
      value: this.getValueLink().value,
      onChange: this.onInputChange.bind(this)
    }

    const suggestions = this.getSuggestions(this.getValueLink().value);

    return (
      <Autosuggest
        suggestions={suggestions}
        getSuggestionValue={::this.getSuggestionValue}
        onSuggestionSelected={::this.onSuggestionSelected}
        renderSuggestion={::this.renderSuggestion}
        inputProps={inputProps} />
    )
  }
}
