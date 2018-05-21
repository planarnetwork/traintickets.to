import * as React from "react";
import {DateRangePicker} from "react-dates";
import {Moment} from "moment";
import * as moment from "moment";
import 'react-dates/lib/css/_datepicker.css';
import {SearchContext, SearchProviderContext} from "../Search";

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
      <SearchContext.Consumer>
        {(context: SearchProviderContext) => (
          <DateRangePicker
            {...this.state}
            {...this.props}
            onDatesChange={this.onDatesChange(context)}
            onFocusChange={this.onFocusChange}
            renderCalendarInfo={this.renderDatePresets(context)}
          />
        )}
      </SearchContext.Consumer>
    )
  }

  public onDatesChange = (context: SearchProviderContext) => {
    return ({ startDate, endDate }: DateValueState): void => {
      this.setState({startDate, endDate});

      context.setState({
        outwardDate: startDate.format(),
        returnDate: endDate ? endDate.format() : null
      });
    };
  };

  public onFocusChange = (focusedInput: DateType) => {
    this.setState({ focusedInput });
  };

  public renderDatePresets = (context: SearchProviderContext) => {
    return () => {
      const presets = [
        { text: "no return", startDate: this.state.startDate, endDate: null },
        { text: "day after", startDate: this.state.startDate, endDate: this.state.startDate.clone().add(1, "day") },
        { text: "week after", startDate: this.state.startDate, endDate: this.state.startDate.clone().add(1, "week") }
      ];

      return (
        <div>Return {presets.map(p => this.renderDatePreset(p, context))}</div>
      );
    }
  };

  public renderDatePreset = (preset: DatePreset, context: SearchProviderContext) => {
    const onChange = () => this.onDatesChange(context)(preset);

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