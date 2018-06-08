import * as Autosuggest from "react-autosuggest";
import * as React from "react";
import {locations, Location, locationByCode} from "../../../config/locations";
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

  constructor(props: StationInputProps) {
    super(props);

    if (props.defaultValue === "geo") {
      navigator.geolocation.getCurrentPosition(this.onGetLocation);
    }
    else {
      this.state.code = props.defaultValue;
      this.state.value = locationByCode[props.defaultValue].name;

    }
  }

  public onGetLocation(position: Position) {
    const tempLocations = Object.values(locationByCode);

    tempLocations.sort((a, b) => {
      const distanceA = Math.abs(position.coords.latitude - a.lat) + Math.abs(position.coords.longitude - a.lon);
      const distanceB = Math.abs(position.coords.latitude - b.lat) + Math.abs(position.coords.longitude - b.lon);

      return distanceA - distanceB;
    });

    this.setState({ code: tempLocations[0].code, value: tempLocations[0].name });
    this.props.onChange({ [this.props.name]: tempLocations[0].code });
  }

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
  onChange: (state: { [name: string]: string }) => any;
  defaultValue: string;
}

interface StationInputState {
  suggestions: Location[];
  value: string;
  lastSelected: string;
  code: string;
  lastCode: string;
}

