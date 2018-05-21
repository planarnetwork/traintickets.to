import * as React from "react";
import {DateRangePicker} from "react-dates";
import {Moment} from "moment";
import * as moment from "moment";
import 'react-dates/lib/css/_datepicker.css';


export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {

  public constructor(props: DatePickerProps) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: moment(),
      endDate: null
    };
  }

  public render() {
    return (
      <DateRangePicker
        {...this.state}
        {...this.props}
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        renderCalendarInfo={this.renderDatePresets}
      />
    )
  }

  public onDatesChange = ({ startDate, endDate }: DateValueState): void => {
    this.setState({ startDate, endDate });
  };

  public onFocusChange = (focusedInput: DateType) => {
    this.setState({ focusedInput });
  };

  public renderDatePresets = () => {
    const presets = [
      { text: "no return", startDate: this.state.startDate, endDate: null },
      { text: "day after", startDate: this.state.startDate, endDate: this.state.startDate.clone().add(1, "day") },
      { text: "week after", startDate: this.state.startDate, endDate: this.state.startDate.clone().add(1, "week") }
    ];

    return (
      <div>Return {presets.map(this.renderDatePreset)}</div>
    );
  };

  public renderDatePreset = (preset: DatePreset) => {
    const onChange = () => this.onDatesChange(preset);

    return <button key={preset.text} type="button" onClick={onChange}>{preset.text}</button>;
  }

}

interface DatePickerProps {
  startDateId: string;
  endDateId: string;
}

interface DateValueState {
  startDate: Moment;
  endDate: Moment | null;
}

interface DatePickerState extends DateValueState {
  focusedInput: DateType;
}

type DateType = "startDate" | "endDate" | null;

interface DatePreset extends DateValueState {
  text: string;
}