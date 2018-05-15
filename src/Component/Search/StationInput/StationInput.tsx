import * as Autosuggest from "react-autosuggest";
import * as React from "react";
import {locations, Location} from "../../../Data/locations";

export class StationInput extends React.Component {
  public state: StationInputState;

  constructor() {
    super({});

    this.state = {
      value: "",
      suggestions: []
    };
  }

  public onChange = (event: React.FormEvent<HTMLInputElement>, { newValue }: any) => {
    this.setState({
      value: newValue
    });
  };

  public onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  public onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  public render() {
    const inputProps = {
      placeholder: "TODO",
      value: this.state.value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

interface StationInputState {
  value: string;
  suggestions: Location[];
}

const getSuggestions = (value: string) => {
  const inputValue = value.trim().toUpperCase();
  const inputLength = inputValue.length;

  return inputLength < 3 ? [] : locations.filter(l =>
    (inputLength === 3 && inputValue === l.code) || l.name.toUpperCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = (location: Location) => location.name;

const renderSuggestion = (location: Location) => (
  <div>
    {location.name} [{location.code}]
  </div>
);