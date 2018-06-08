import * as React from "react";
import {railcards} from "../../../config/railcards";
import autobind from "autobind-decorator";

@autobind
export class RailcardSelect extends React.Component<RailcardSelectProps, RailcardSelectState> {

  constructor(props: RailcardSelectProps) {
    super(props);

    this.state = {
      values: [],
      disabled: false
    };
  }

  public onSelectChange(event: React.FormEvent<HTMLSelectElement>) {
    const values = this.state.values.concat([event.currentTarget.value]);
    const disabled = values.length >= this.props.max;

    this.setState({ values, disabled });

    this.props.onChange({ [this.props.name]: values.join() });
    event.currentTarget.options[0].selected = true;
  };

  public onRemoveItem(event: React.FormEvent<HTMLButtonElement>) {
    const index = parseInt(event.currentTarget.value, 10);
    const values = this.state.values.slice(0, index).concat(this.state.values.slice(index + 1));
    const disabled = values.length >= this.props.max;

    this.props.onChange({ [this.props.name]: values.join() });
    this.setState({ values, disabled });
  };

  public render() {
    return (
      <div>
        <select disabled={this.state.disabled} name={this.props.name} onChange={this.onSelectChange}>
          <option value="">Select Railcard</option>
          { railcards.map((railcard, i) => (
            <option key={i} value={railcard.value}>{railcard.label}</option>
          ))}
        </select>
        <ul>
          { this.state.values.map((railcardCode, i) => (
            <li key={i}>
              <button value={i} type="button" onClick={this.onRemoveItem}>x</button>{railcardCode}
            </li>
          ))}
        </ul>
      </div>
    );
  }

}

interface RailcardSelectProps {
  name: string;
  max: number;
  onChange: (state: { [name: string]: string }) => any
}

interface RailcardSelectState {
  values: string[];
  disabled: boolean;
}
