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
      <div className="container clearfix">
        <SearchProvider {...props}>
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

            <SearchContext.Consumer>
              {(context: SearchProviderContext) => (
                <div className="search-col search-col-3 pull-left center">
                  <NumberInput name="adults" label="Adults" min={0} max={9} defaultValue={context.state.adults} onChange={context.setState}/>
                  <NumberInput name="children" label="Children" min={0} max={9} defaultValue={context.state.children} onChange={context.setState}/>
                </div>
                )}
            </SearchContext.Consumer>

            <div className="search-col search-col-4 pull-left">
              <div className="form-group">
                <label className="form-label" htmlFor="child">Railcards</label>
                <RailcardSelect name="railcards" max={4}/>
              </div>
            </div>

            <div className="search-col search-col-5 pull-left">
              <div className="form-group">
                <legend className="form-label">Filters</legend>
                <ClassSelector/>
              </div>
            </div>
          </form>
        </SearchProvider>
      </div>
    </section>
  )
}



