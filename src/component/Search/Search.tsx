import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './Search.css';
import {StationInput} from "./StationInput/StationInput";
import {RailcardSelect} from "./RailcardSelect/RailcardSelect";
import {NumberInput} from "../Form/NumberInput/NumberInput";
import {RadioGroup} from "../Form/RadioGroup/RadioGroup";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import {Moment} from "moment";
import autobind from "autobind-decorator";
import {Checkbox} from "../Form/Checkbox/Checkbox";

require("moment/locale/en-gb");

const emptyState = {
  origin: "",
  destination: "1072",
  outwardDate: moment().format(moment.HTML5_FMT.DATE),
  returnDate: null,
  railcards: "",
  standardClass: true,
  firstClass: false,
  adults: 1,
  children: 0,
  singles: true,
  returns: true,
  advance: false,
  advancedSearch: false
};

export const defaultQueryState = localStorage.getItem("searchState")
  ? Object.assign(emptyState, JSON.parse(localStorage.getItem("searchState")!))
  : emptyState;

@autobind
export class Search extends React.Component<SearchProps, SearchState> {

  public state = defaultQueryState;

  constructor(props: SearchProps) {
    super(props);

    if (this.state.origin && this.state.destination && this.state.outwardDate && this.state.adults + this.state.children > 0) {
      this.props.onSubmit(this.state);
    }
  }

  public set(values: Partial<SearchState>): void {
    this.setState((previousState: SearchState) => {
      const state = Object.assign(previousState, values);

      if (state.origin && state.destination && state.outwardDate && state.adults + state.children > 0) {
        this.props.onSubmit(state);
      }

      localStorage.setItem("searchState", JSON.stringify(state));

      return state;
    });
  }

  public onOutwardDateChange(date: Moment | null) {
    if (date) {
      const outwardDate = date.format(moment.HTML5_FMT.DATE);
      const returnDate = this.state.returnDate && date.isAfter(this.state.returnDate) ? outwardDate : this.state.returnDate;

      this.set({ outwardDate, returnDate });
    }
  }

  public onReturnDateChange(date: Moment | null) {
    this.set({ returnDate: date ? date.format(moment.HTML5_FMT.DATE) : null });
  }

  public toggle(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      advancedSearch: !this.state.advancedSearch
    } as any);
    event.stopPropagation();
  }

  public render() {
    const advancedClasses = this.state.advancedSearch ? "search--advanced is-open" : "search--advanced";
    const btnClasses = this.state.advancedSearch ? "search--advanced-btn is-active" : "search--advanced-btn";
    console.log(this.state.advancedSearch);

    return (
      <form>
        <div className="search">
          <div className="container">
            <div className="row">
              <div className="search--column col-md-10 col-lg-10">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="origin">From</label>
                      <StationInput name="origin" defaultValue={this.state.origin || "geo"} placeholder="Leaving from" onChange={this.set}/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="destination">Going to</label>
                      <StationInput name="destination" defaultValue={this.state.destination} placeholder="Going to" onChange={this.set}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="search--column col-md-8 col-lg-9">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="outDate">Outward Date</label>
                      <DatePicker
                        onChange={this.onOutwardDateChange}
                        minDate={moment()}
                        selected={moment(this.state.outwardDate)}
                        dateFormat="ddd, DD MMM YYYY"
                        placeholderText="Outward date"
                        className="form--input"
                        locale="en-gb"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="retDate">Return Date</label>
                      <DatePicker
                        onChange={this.onReturnDateChange}
                        minDate={moment(this.state.outwardDate)}
                        selected={this.state.returnDate ? moment(this.state.returnDate) : null}
                        dateFormat="ddd, DD MMM YYYY"
                        isClearable={true}
                        placeholderText="Return date"
                        className="form--input"
                        locale="en-gb"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="search--column col-12 col-md-6 col-lg-5">
                <div className="row">
                  <div className="col-12">
                    <NumberInput name="adults" label="Adults" min={0} max={9} defaultValue={this.state.adults} onChange={this.set}/>
                  </div>
                  <div className="col-12">
                    <NumberInput name="children" label="Children" min={0} max={9} defaultValue={this.state.children} onChange={this.set}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={advancedClasses}>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-5">
                  <legend className="form-label">Class</legend>
                  <RadioGroup name="class" options={["standardClass", "firstClass"]} labels={["Standard", "First"]} onChange={this.set}/>
                </div>
                { this.state.returnDate && (
                  <div className="col-sm-12 col-md-8 col-lg-5">
                    <legend className="form-label">Ticket type</legend>
                    <Checkbox label="Singles" name="singles" checked={this.state.singles} onChange={this.set}/>
                    <Checkbox label="Returns" name="returns" checked={this.state.returns} onChange={this.set}/>
                  </div>
                )}
                <div className="col-sm-24 col-md-8 col-lg-14">
                  <div className="form-group">
                    <label className="form-label" htmlFor="child">Railcards</label>
                    <RailcardSelect name="railcards" max={4} onChange={this.set}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className={btnClasses} type="button" onClick={this.toggle}>
            <span className="sr-only">Show more search options</span>
          </button>
        </div>
      </form>
    );
  }
}

export interface SearchState {
  origin: string;
  destination: string;
  outwardDate: string;
  returnDate: string | null;
  railcards: string;
  standardClass: boolean;
  firstClass: boolean;
  adults: number;
  children: number;
  singles: boolean;
  returns: boolean;
  advance: boolean;
  advancedSearch: boolean;
}

export interface SearchProps {
  onSubmit: (query: SearchState) => any;
}

