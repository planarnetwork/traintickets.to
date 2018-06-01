import * as Autosuggest from "react-autosuggest";
import * as React from "react";
import {locations, Location} from "../../../Data/locations";
import {SearchProviderContext} from "../SearchContext";
import {SearchContext} from "../SearchContext";

/**
 * Auto complete for stations
 */
export class StationInput extends React.Component<StationInputProps, StationInputState> {

  public state = {
    suggestions: []
  };

  public onChange = (setState: any) => {
    return (event: React.FormEvent<HTMLInputElement>, { newValue }: any) => {
      setState({ [this.props.name]: newValue });
    };
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
    return (
      <SearchContext.Consumer>
        {(context: SearchProviderContext) => (
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: this.props.placeholder,
              name: this.props.name,
              onChange: this.onChange(context.setState),
              value: context.state[this.props.name]
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
}

const getSuggestions = (value: string) => {
  const inputValue = value.trim().toUpperCase();
  const inputLength = inputValue.length;

  return inputLength < 3 ? [] : locations.filter(l =>
    (inputLength === 3 && inputValue === l.code) || l.name.toUpperCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = (location: Location) => location.name;

const renderSuggestion = (location: Location) => <div>{location.name} [{location.code}]</div>;
