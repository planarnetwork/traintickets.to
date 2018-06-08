import * as React from 'react';
import './Search.css';
import {StationInput} from "./StationInput/StationInput";
import {DatePicker} from "./DatePicker/DatePicker";
import {RailcardSelect} from "./RailcardSelect/RailcardSelect";
import {SearchProvider, SearchProviderProps, SearchContext, SearchProviderContext} from './SearchContext';
import {ClassSelector} from "./ClassSelector/ClassSelector";
import {NumberInput} from "../Form/NumberInput/NumberInput";

export function Search(props: SearchProviderProps) {
  return (
    <section className="search">
      <div className="container">
        <SearchProvider {...props}>
          <form className="row">
            <div className="col-md-7 col-lg-4">
              <div className="row">
                <div className="col-sm-12 col-md-24">
                  <div className="form-group">
                    <label className="form-label" htmlFor="origin">From</label>
                    <StationInput name="origin" placeholder="Leaving from"/>
                  </div>
                </div>
                <div className="col-sm-12 col-md-24">
                  <div className="form-group">
                    <label className="form-label" htmlFor="destination">To</label>
                    <StationInput name="destination" placeholder="Going to"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7 col-lg-4">
              <div className="form-group">
                <label className="form-label" htmlFor="outDate">Dates</label>
                <DatePicker startDateId="startDate" endDateId="endDate"/>
              </div>
            </div>

            <SearchContext.Consumer>
              {(context: SearchProviderContext) => (
                <div className="col-md-4 col-lg-3 center">
                  <NumberInput name="adults" label="Adults" min={0} max={9} defaultValue={context.state.adults} onChange={context.setState}/>
                  <NumberInput name="children" label="Children" min={0} max={9} defaultValue={context.state.children} onChange={context.setState}/>
                </div>
                )}
            </SearchContext.Consumer>

            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label className="form-label" htmlFor="child">Railcards</label>
                <RailcardSelect name="railcards" max={4}/>
              </div>
            </div>

            <div className="col-md-24 col-lg">
                <legend className="form-label">Filters</legend>
                <div className="row">
                  <div className="col-sm">
                    <ClassSelector/>
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
        </SearchProvider>
      </div>
    </section>
  )
}



