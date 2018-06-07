import * as React from "react";
import * as moment from "moment";

export const SearchContext = React.createContext({} as SearchProviderContext);

export class SearchProvider extends React.Component<SearchProviderProps, SearchQuery> {

  public state = {
    origin: "",
    destination: "",
    outwardDate: moment().format(),
    returnDate: null,
    railcards: "",
    standardClass: true,
    firstClass: false,
    adults: 1,
    children: 0
  };

  public set = (values: Partial<SearchQuery>): void => {
    this.setState((previousState: SearchQuery) => {
      const state = Object.assign(previousState, values);

      if (state.origin && state.destination && state.outwardDate) {
        this.props.onSubmit(state);
      }

      return state;
    });
  };


  public render() {
    return (
      <SearchContext.Provider value={{state: this.state, setState: this.set}}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export interface SearchProviderProps {
  onSubmit: (form: SearchQuery) => any;
}

export interface SearchQuery {
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

export interface SearchProviderContext {
  setState: (state: Partial<SearchQuery>) => void;
  state: SearchQuery;
}