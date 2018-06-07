import * as React from "react";
import autobind from "autobind-decorator";

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
      <fieldset>
        { this.props.options.map(this.renderRadio) }
      </fieldset>
    );
  }

  public renderRadio(value: string, index: number) {
    return (
      <div className="form-group" key={value}>
        <label className="form-label-radio">
          <input type="radio" onChange={this.onChange} className="form-check-input" name={this.props.name} value={value} checked={this.state.selected[value]}/>
          { this.props.labels[index] }
        </label>
      </div>
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
