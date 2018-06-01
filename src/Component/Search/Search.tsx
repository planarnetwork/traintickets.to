import * as React from 'react';
import './Search.css';
import {StationInput} from "./StationInput/StationInput";
import {DatePicker} from "./DatePicker/DatePicker";
import {RailcardSelect} from "./RailcardSelect/RailcardSelect";

export function Search() {
  return (
    <section className="search">
      <div className="container clearfix">
        <SearchProvider>
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
                <input className="form-control center" id="adult" type="number" defaultValue="1" min="0" max="9"/>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="child">Child</label>
                <input className="form-control center" id="child" type="number" defaultValue="0" min="0" max="9"/>
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
                    <input type="radio" className="form-check-input" name="class" id="class1" value="Standard" defaultChecked={true}/>
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
        </SearchProvider>
      </div>
    </section>
  )
}

export const SearchContext = React.createContext({} as SearchProviderContext);

export class SearchProvider extends React.Component<{}, SearchFields> {

  public state = {
    origin: "",
    destination: "",
    outwardDate: "",
    returnDate: null,
    railcards: "",
  };

  public set = (values: Partial<SearchFields>): void => {
    this.setState(values as SearchFields);
  };

  public render() {
    return (
      <SearchContext.Provider value={{ state: this.state, setState: this.set }}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

interface SearchFields {
  origin: string;
  destination: string;
  outwardDate: string;
  returnDate: string | null;
  railcards: string;
}

export interface SearchProviderContext {
  setState: (state: Partial<SearchFields>) => void;
  state: SearchFields;
}