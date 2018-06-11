import * as React from "react";
import autobind from "autobind-decorator";
import './NumberInput.css';

@autobind
export class NumberInput extends React.Component<NumberInputProps, NumberInputState> {

  constructor(props: NumberInputProps) {
    super(props);

    this.state = {
      value: props.defaultValue !== undefined ? props.defaultValue : 1
    }
  }

  public decrement() {
    this.setState((previousState: NumberInputState) => {
      const value = Math.max(this.props.min, previousState.value - 1);

      this.props.onChange({ [this.props.name]: value });

      return { value };
    });
  }

  public increment() {
    this.setState((previousState: NumberInputState) => {
      const value = Math.min(this.props.max, previousState.value + 1);

      this.props.onChange({ [this.props.name]: value });

      return { value };
    });
  }

  public render() {
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={this.props.name}>{this.props.label}</label>
        <div className="number-input--container clearfix">
          <button onClick={this.decrement} className="number-input--btn number-input--btn__less pull-left" type="button">
            <span className="sr-only">Less passengers</span>
          </button>
          <input
            readOnly={true}
            className="form--input form--input__passengers pull-left"
            type="number"
            value={this.state.value}
            min={this.props.min}
            max={this.props.max}
          />
          <button onClick={this.increment} className="number-input--btn number-input--btn__more pull-left" type="button">
            <span className="sr-only">More passengers</span>
          </button>
        </div>
      </div>
    )
  }
}

export interface NumberInputProps {
  name: string;
  label: string;
  defaultValue?: number;
  min: number;
  max: number;
  onChange: (state: { [name: string]: number }) => void;
}

export interface NumberInputState {
  value: number;
}