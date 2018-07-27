import * as React from "react";
import autobind from "autobind-decorator";
import "./Checkbox.css";

@autobind
export class Checkbox extends React.Component<CheckboxProps> {

  public onChange() {
    this.props.onChange({ [this.props.name]: !this.props.checked });
  }

  public render() {
    return (
      <label className="checkbox">
        <input type="checkbox" className="sr-only" name={this.props.name} checked={this.props.checked} onChange={this.onChange}/>
        <span>
          {this.props.label}
        </span>
      </label>
    );
  }
}

export interface CheckboxProps {
  name: string;
  checked: boolean;
  label: string;
  onChange: (state: { [name: string]: boolean }) => any;
}