import * as React from 'react';
import './Search.css';
import {StationInput} from "./StationInput/StationInput";
import {RailcardSelect} from "./RailcardSelect/RailcardSelect";
import {NumberInput} from "../Form/NumberInput/NumberInput";
import {RadioGroup} from "../Form/RadioGroup/RadioGroup";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import {Moment} from "moment";
import autobind from "autobind-decorator";
import "react-datepicker/dist/react-datepicker.css";


@autobind
export class Search extends React.Component<SearchProps, SearchState> {

  public state = {
    origin: "",
    destination: "",
    outwardDate: moment().format("YYYY-MM-DD"),
    returnDate: null,
    railcards: "",
    standardClass: true,
    firstClass: false,
    adults: 1,
    children: 0
  };

  public set(values: Partial<SearchState>): void {
    this.setState((previousState: SearchState) => {
      const state = Object.assign(previousState, values);

      if (state.origin && state.destination && state.outwardDate) {
        this.props.onSubmit(state);
      }

      return state;
    });
  }

  public onOutwardDateChange(date: Moment | null) {
    if (date) {
      this.set({ outwardDate: date.format("YYYY-MM-DD") });
    }
  }

  public onReturnDateChange(date: Moment | null) {
    this.set({ returnDate: date ? date.format("YYYY-MM-DD") : null });
  }

  public render() {
    return (
      <section className="search">
        <div className="container">
          <form className="row">
            <div className="col-md-7 col-lg-4">
              <div className="row">
                <div className="col-sm-12 col-md-24">
                  <div className="form-group">
                    <label className="form-label" htmlFor="origin">From</label>
                    <StationInput name="origin" placeholder="Leaving from" onChange={this.set}/>
                  </div>
                </div>
                <div className="col-sm-12 col-md-24">
                  <div className="form-group">
                    <label className="form-label" htmlFor="destination">Going to</label>
                    <StationInput name="destination" placeholder="Going to" onChange={this.set}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-4">
              <div className="form-group">
                <label className="form-label" htmlFor="outDate">Outward Date</label>
                <DatePicker
                  onChange={this.onOutwardDateChange}
                  minDate={moment()}
                  selected={moment(this.state.outwardDate)} dateFormat="YYYY-MM-DD"
                  placeholderText={"Outward date"}
                />
                <label className="form-label" htmlFor="retDate">Return Date</label>
                <DatePicker
                  onChange={this.onReturnDateChange}
                  minDate={moment(this.state.outwardDate)}
                  selected={this.state.returnDate ? moment(this.state.returnDate!) : null}
                  dateFormat="YYYY-MM-DD"
                  isClearable={true}
                  placeholderText={"Return date"}
                />
              </div>
            </div>

            <div className="col-md-4 col-lg-3 center">
              <NumberInput name="adults" label="Adults" min={0} max={9} defaultValue={this.state.adults} onChange={this.set}/>
              <NumberInput name="children" label="Children" min={0} max={9} defaultValue={this.state.children} onChange={this.set}/>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label className="form-label" htmlFor="child">Railcards</label>
                <RailcardSelect name="railcards" max={4} onChange={this.set}/>
              </div>
            </div>

            <div className="col-md-24 col-lg">
              <legend className="form-label">Filters</legend>
              <div className="row">
                <div className="col-sm">
                  <RadioGroup name="class" options={["standardClass", "firstClass"]} labels={["Standard", "First"]} onChange={this.set}/>
                </div>
                <div className="col-sm">
                  Checkboxes
                </div>
                <div className="col-sm">
                  Checkboxes
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
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
}

export interface SearchProps {
  onSubmit: (query: SearchState) => any;
}

