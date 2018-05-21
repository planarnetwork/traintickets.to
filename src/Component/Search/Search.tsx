import * as React from 'react';
import './Search.css';
import {StationInput} from "./StationInput/StationInput";
import {DatePicker} from "./DatePicker/DatePicker";
import {RailcardSelect} from "./RailcardSelect/RailcardSelect";

export function Search() {
  return (
    <section className="search">
      <div className="container clearfix">
        <form>
          <div className="search-col search-col-1 pull-left">
            <div className="form-group">
              <label className="form-label" htmlFor="origin">Origin</label>
              <StationInput name="origin" placeholder="Leaving from"/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="destination">Destination</label>
              <StationInput name="destination" placeholder="Going to"/>
            </div>
          </div>

          <div className="search-col search-col-2 pull-left">
            <div className="form-group">
              <label className="form-label" htmlFor="outDate">Dates</label>
              <DatePicker startDateId="startDate" endDateId="endDate"/>
            </div>
          </div>

          <div className="search-col search-col-3 pull-left center">
            <div className="form-group">
              <label className="form-label" htmlFor="adult">Adult</label>
              <input className="form-control center" id="adult" type="number" value="1" min="0" max="9"/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="child">Child</label>
              <input className="form-control center" id="child" type="number" value="0" min="0" max="9"/>
            </div>
          </div>

          <div className="search-col search-col-4 pull-left">
            <div className="form-group">
              <label className="form-label" htmlFor="child">Railcards</label>
              <RailcardSelect name="railcards" max={4}/>
            </div>
          </div>

          <div className="search-col search-col-5 pull-left">
            <div className="form-group">
              <legend className="form-label">Filters</legend>
              <div className="form-group">
                <label className="form-label-radio">
                  <input type="radio" className="form-check-input" name="class" id="class1" value="Standard" checked={true}/>
                  Standard
                </label>
              </div>
              <div className="form-group">
                <label className="form-label-radio">
                  <input type="radio" className="form-check-input" name="class" id="class2" value="First"/>
                  First
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}