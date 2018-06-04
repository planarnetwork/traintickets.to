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
  };

  public set = (values: Partial<SearchQuery>): void => {
    this.setState(values as SearchQuery);
  };

  public componentDidUpdate(): void {
    if (this.state.origin && this.state.destination && this.state.outwardDate) {
      this.props.onSubmit(this.state);
    }
  }

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
}

export interface SearchProviderContext {
  setState: (state: Partial<SearchQuery>) => void;
  state: SearchQuery;
}