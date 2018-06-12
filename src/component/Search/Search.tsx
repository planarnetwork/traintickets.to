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

export const defaultQueryState = localStorage.getItem("searchState") ? JSON.parse(localStorage.getItem("searchState")!) : {
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
  returns: true
};

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
      this.set({ outwardDate: date.format(moment.HTML5_FMT.DATE) });
    }
  }

  public onReturnDateChange(date: Moment | null) {
    this.set({ returnDate: date ? date.format(moment.HTML5_FMT.DATE) : null });
  }

  public render() {
    return (
      <form>
        <div className="search">
          <div className="container">
            <div className="row">
              <div className="search--column col-md-12 col-lg-8">
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

              <div className="search--column col-md-12 col-lg-7">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="outDate">Outward Date</label>
                      <DatePicker
                        onChange={this.onOutwardDateChange}
                        minDate={moment()}
                        selected={moment(this.state.outwardDate)}
                        dateFormat="ddd, DD MMM YYYY"
                        placeholderText={"Outward date"}
                        className="form--input"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="retDate">Return Date</label>
                      <DatePicker
                        onChange={this.onReturnDateChange}
                        minDate={moment(this.state.outwardDate)}
                        selected={this.state.returnDate ? moment(this.state.returnDate!) : null}
                        dateFormat="ddd, DD MMM YYYY"
                        isClearable={true}
                        placeholderText={"Return date"}
                        className="form--input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="search--column col-12 col-md-6 col-lg-4">
                <div className="row">
                  <div className="col-12">
                    <NumberInput name="adults" label="Adults" min={0} max={9} defaultValue={this.state.adults} onChange={this.set}/>
                  </div>
                  <div className="col-12">
                    <NumberInput name="children" label="Children" min={0} max={9} defaultValue={this.state.children} onChange={this.set}/>
                  </div>
                </div>
              </div>

              <div className="search--column col-12 col-md-8 col-lg-5">
                <div className="form-group">
                  <label className="form-label" htmlFor="child">Railcards</label>
                  <RailcardSelect name="railcards" max={4} onChange={this.set}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="search--filters">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
                <legend className="form-label">Class</legend>
                <RadioGroup name="class" options={["standardClass", "firstClass"]} labels={["Standard", "First"]} onChange={this.set}/>
              </div>
              <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
                <legend className="form-label">Ticket type</legend>
                <Checkbox label="Singles" name="singles" checked={this.state.singles} onChange={this.set}/>
                <Checkbox label="Returns" name="returns" checked={this.state.returns} onChange={this.set}/>
              </div>
            </div>
          </div>
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
}

export interface SearchProps {
  onSubmit: (query: SearchState) => any;
}

