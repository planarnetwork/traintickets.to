import * as Autosuggest from "react-autosuggest";
import * as React from "react";
import {locations, Location} from "../../../config/locations";
import autobind from "autobind-decorator";
import './StationInput.css';

/**
 * Auto complete for stations
 */
@autobind
export class StationInput extends React.Component<StationInputProps, StationInputState> {

  public state = {
    value: "",
    code: "",
    suggestions: [],
    lastSelected: "",
    lastCode: ""
  };

  public onChange(event: React.FormEvent<HTMLInputElement>, { newValue }: any) {
    this.setState({ value: newValue });
  }

  public onHighlight({ suggestion }: any) {
      if (suggestion) {
        this.setState({ lastSelected: suggestion.name, code: suggestion.code });
      }
  }

  public onSuggestionsFetchRequested({ value }: any) {
    this.setState({ suggestions: this.getSuggestions(value) });
  }

  public onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  public onBlur() {
    if (this.state.lastCode !== this.state.code) {
      this.props.onChange({ [this.props.name]: this.state.code });
    }

    this.setState({ value: this.state.lastSelected, lastCode: this.state.code });
  }

  public renderSuggestion(location: Location, { query, isHighlighted }: any) {
    return (
      <div className={isHighlighted ? "selected" : "not-selected"}>
        {location.name} [{location.code}]
      </div>
    )
  };

  public getSuggestions(value: string) {
    const inputValue = value.trim().toUpperCase();
    const inputLength = inputValue.length;

    return inputLength < 3 ? [] : locations.filter(l =>
      (inputLength === 3 && inputValue === l.code) || l.name.toUpperCase().slice(0, inputLength) === inputValue
    );
  };

  public getSuggestionValue(location: Location) {
    return location.name;
  };

  public render() {
    return (
      <Autosuggest
        highlightFirstSuggestion={true}
        suggestions={this.state.suggestions}
        onSuggestionHighlighted={this.onHighlight}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          placeholder: this.props.placeholder,
          name: this.props.name,
          onChange: this.onChange,
          onBlur: this.onBlur,
          value: this.state.value
        }}
      />
    );
  }
}

interface StationInputProps {
  placeholder: string;
  name: string;
  onChange: (state: { [name: string]: string }) => any
}

interface StationInputState {
  suggestions: Location[];
  value: string;
  lastSelected: string;
  code: string;
  lastCode: string;
}

