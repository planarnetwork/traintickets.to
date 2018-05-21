import * as React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import {railcards} from "../../../Data/railcards";

export class RailcardSelect extends React.Component<RailcardSelectProps, RailcardSelectState> {

  public constructor(props: RailcardSelectProps) {
    super(props);

    this.state = {
      value: []
    }
  }

  public onSelectChange = (value: string[]) => {
    this.setState({ value });
  };

  public render() {
    return (<Select
      value={this.state.value}
      name={this.props.name}
      multi={true}
      options={railcards}
      simpleValue={true}
      removeSelected={false}
      joinValues={true}
      placeholder="Railcards"
      onChange={this.onSelectChange}
    />);
  }

}

interface RailcardSelectProps {
  name: string;
}

interface RailcardSelectState {
  value: string[];
}
