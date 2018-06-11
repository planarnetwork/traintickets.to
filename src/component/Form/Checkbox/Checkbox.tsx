import * as React from "react";
import autobind from "autobind-decorator";

@autobind
export class Checkbox extends React.Component<CheckboxProps> {

  public onChange() {
    this.props.onChange({ [this.props.name]: !this.props.checked });
  }

  public render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type="checkbox" name={this.props.name} checked={this.props.checked} onChange={this.onChange}/>
      </div>
    );
  }
}

export interface CheckboxProps {
  name: string;
  checked: boolean;
  label: string;
  onChange: (state: { [name: string]: boolean }) => any;
}