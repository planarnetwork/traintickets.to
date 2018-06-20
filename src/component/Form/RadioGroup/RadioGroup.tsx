import * as React from "react";
import autobind from "autobind-decorator";
import "./Radio.css";

@autobind
export class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {

  constructor(props: RadioGroupProps) {
    super(props);

    const noneSelected: RadioGroupSelectionState = {};

    for (const option of props.options) {
      noneSelected[option] = false;
    }

    const selected = Object.assign({}, noneSelected);

    if (props.defaultOption) {
      selected[props.defaultOption] = true;
    }
    else {
      selected[props.options[0]] = true;
    }

    this.state = { selected, noneSelected };
  }

  public onChange(event: React.FormEvent<HTMLInputElement>) {
    const selected =  Object.assign({}, this.state.noneSelected, { [event.currentTarget.value]: true });

    this.setState({ selected });
    this.props.onChange(selected);
  }

  public render() {
    return (
      <div>
        { this.props.options.map(this.renderRadio) }
      </div>
    );
  }

  public renderRadio(value: string, index: number) {
    return (
      <label htmlFor={this.props.name + index} className="radio" key={value}>
        <input type="radio" onChange={this.onChange} className="sr-only" id={this.props.name + index} name={this.props.name} value={value} checked={this.state.selected[value]}/>
        <span>{ this.props.labels[index] }</span>
      </label>
    )
  }

}

export interface RadioGroupProps {
  name: string;
  options: string[];
  defaultOption?: string;
  labels: string[];
  onChange: (state: RadioGroupSelectionState) => any;
}

export interface RadioGroupSelectionState {
  [option: string]: boolean;
}

export interface RadioGroupState {
  selected: RadioGroupSelectionState;
  noneSelected: RadioGroupSelectionState;
}
