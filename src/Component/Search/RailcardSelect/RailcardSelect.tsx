import * as React from "react";
import {railcards} from "../../../Data/railcards";
import {SearchProviderContext} from "../SearchContext";
import {SearchContext} from "../SearchContext";

export class RailcardSelect extends React.Component<RailcardSelectProps, RailcardSelectState> {

  constructor(props: RailcardSelectProps) {
    super(props);

    this.state = {
      values: [],
      disabled: false
    };
  }

  public onSelectChange = (context: SearchProviderContext) => {
    return (event: React.FormEvent<HTMLSelectElement>) => {
      const values = this.state.values.concat([event.currentTarget.value]);
      const disabled = values.length >= this.props.max;

      this.setState({ values, disabled });

      context.setState({ [this.props.name]: values.join() });
      event.currentTarget.options[0].selected = true;
    };
  };

  public onRemoveItem = (context: SearchProviderContext) => {
    return (event: React.FormEvent<HTMLButtonElement>) => {
      const index = parseInt(event.currentTarget.value, 10);
      const values = this.state.values.slice(0, index).concat(this.state.values.slice(index + 1));
      const disabled = values.length >= this.props.max;

      context.setState({ [this.props.name]: values.join() });
      this.setState({ values, disabled });
    };
  };

  public render() {
    return (
      <SearchContext.Consumer>
        {(context: SearchProviderContext) => (
          <div>
            <select disabled={this.state.disabled} name={this.props.name} onChange={this.onSelectChange(context)}>
              <option value="">Select Railcard</option>
              { railcards.map((railcard, i) => (
                <option key={i} value={railcard.value}>{railcard.label}</option>
              ))}
            </select>
            <ul>
              { this.state.values.map((railcardCode, i) => (
                <li key={i}>
                  <button value={i} type="button" onClick={this.onRemoveItem(context)}>x</button>{railcardCode}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SearchContext.Consumer>
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
