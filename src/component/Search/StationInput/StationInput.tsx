import * as Autosuggest from "react-autosuggest";
import * as React from "react";
import {locations, Location} from "../../../config/locations";
import {SearchProviderContext} from "../SearchContext";
import {SearchContext} from "../SearchContext";
import './StationInput.scss';

/**
 * Auto complete for stations
 */
export class StationInput extends React.Component<StationInputProps, StationInputState> {

  public state = {
    value: "",
    suggestions: [],
    lastSelected: ""
  };

  public onChange = (event: React.FormEvent<HTMLInputElement>, { newValue }: any) => {
    this.setState({ value: newValue });
  };

  public onHighlight = (context: SearchProviderContext) => {
    return ({ suggestion }: any) => {
      if (suggestion && this.state.lastSelected !== suggestion.name) {
        this.setState({ lastSelected: suggestion.name });
        context.setState({ [this.props.name]: suggestion.code });
      }
    };
  };

  public onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({ suggestions: this.getSuggestions(value) });
  };

  public onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  public onBlur = () => {
    this.setState({ value: this.state.lastSelected });
  };

  public renderSuggestion = (location: Location, { query, isHighlighted }: any) => (
    <div className={isHighlighted ? "selected" : "not-selected"}>
      {location.name} [{location.code}]
    </div>
  );

  public getSuggestions = (value: string) => {
    const inputValue = value.trim().toUpperCase();
    const inputLength = inputValue.length;

    return inputLength < 3 ? [] : locations.filter(l =>
      (inputLength === 3 && inputValue === l.code) || l.name.toUpperCase().slice(0, inputLength) === inputValue
    );
  };

  public getSuggestionValue = (location: Location) => {
    return location.name;
  };

  public render() {
    return (
      <SearchContext.Consumer>
        {(context: SearchProviderContext) => (
          <Autosuggest
            highlightFirstSuggestion={true}
            suggestions={this.state.suggestions}
            onSuggestionHighlighted={this.onHighlight(context)}
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
        )}
      </SearchContext.Consumer>
    );
  }
}

interface StationInputProps {
  placeholder: string;
  name: string;
}

interface StationInputState {
  suggestions: Location[];
  value: string;
  lastSelected: string;
}

