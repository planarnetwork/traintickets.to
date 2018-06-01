import * as React from "react";

export const SearchContext = React.createContext({} as SearchProviderContext);

export class SearchProvider extends React.Component<SearchProviderProps, SearchQuery> {

  public state = {
    origin: "",
    destination: "",
    outwardDate: "",
    returnDate: null,
    railcards: "",
  };

  public set = (values: Partial<SearchQuery>): void => {
    this.setState({...this.state, ...values});
  };

  public componentDidUpdate(prevProps: SearchProviderProps, prevState: SearchQuery): void {
    prevProps.listener(prevState);
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
  listener: (form: SearchQuery) => any;
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