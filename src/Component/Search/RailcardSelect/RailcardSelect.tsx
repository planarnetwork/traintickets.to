import * as React from "react";
import {railcards} from "../../../Data/railcards";

export class RailcardSelect extends React.Component<RailcardSelectProps, RailcardSelectState> {

  public constructor(props: RailcardSelectProps) {
    super(props);

    this.state = {
      values: [],
      disabled: false
    };
  }

  public onSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const values = this.state.values.concat([event.currentTarget.value]);
    const disabled = values.length >= this.props.max;

    this.setState({ values, disabled });

    event.currentTarget.options[0].selected = true;

  };

  public onRemoveItem = (event: React.FormEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.value, 10);
    const values = this.state.values.slice(0, index).concat(this.state.values.slice(index + 1));
    const disabled = values.length >= this.props.max;

    this.setState({ values, disabled });
  };

  public render() {
    return (
      <div>
        <select disabled={this.state.disabled} defaultValue="" name={this.props.name + "_select"} onChange={this.onSelectChange}>
          <option value="">Select Railcard</option>
          { railcards.map((r, i) => <option key={i} value={r.value}>{r.label}</option>) }
        </select>
        <ul>
          { this.state.values.map((r, i) => <li key={i}>
            <button value={i} type="button" onClick={this.onRemoveItem}>x</button>{r}
            <input name={this.props.name + "[]"} type="hidden" value={r}/>
          </li>) }
        </ul>
      </div>
    );
  }

}

interface RailcardSelectProps {
  name: string;
  max: number;
}

interface RailcardSelectState {
  values: string[];
  disabled: boolean;
}
