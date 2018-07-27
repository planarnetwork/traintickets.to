import * as React from 'react';
import {JourneyPlanResults} from "./JourneyPlanResults/JourneyPlanResults";
import {defaultQueryState, Search, SearchState} from "./Search/Search";
import {JourneyPlanner, SearchResults} from "../../service/JourneyPlanner/JourneyPlanner";
import autobind from "autobind-decorator";
import {debounce} from "typescript-debounce-decorator";
import {Footer} from "./Footer/Footer";
import {Wallet} from "../../service/Wallet/Wallet";
import {OrderService} from "../../service/Order/OrderService";

@autobind
export class IndexPage extends React.Component<IndexPageProps, IndexPageState> {

  public state = {
    results: {
      links: {},
      query: defaultQueryState,
      data: {
        outward: [],
        inward: [],
        fares: {},
        prices: {},
        cheapestOutward: "",
        cheapestInward: ""
      }
    },
    error: undefined,
    isAdvanceOpen: defaultQueryState.advancedSearch,
    selected: {
      outward: "",
      inward: "",
      fareOptions: []
    }
  };

  @debounce(200, { leading: false })
  public async onSearch(query: SearchState) {
    const results = await this.props.journeyPlanner.search(query);

    this.setState(results as any);
  };

  public async onOpenAdvanceControls(isAdvanceOpen: boolean) {
    this.setState({ isAdvanceOpen });
  }

  public onPriceChange(selected: SelectedOptions) {
    this.setState({ selected });
  }

  public render() {
    return (
      <React.Fragment>
        <Search onSubmit={this.onSearch} onOpen={this.onOpenAdvanceControls}/>
        { this.state.error && (
          <div className="fares-error">
            <h2 className="fares-error--title">Oh dear.</h2>
            <p>It seems we are having a problem retrieving your results.</p>
          </div>
          )
        }
        { this.state.results && <JourneyPlanResults
          onSelectionChange={this.onPriceChange}
          lessHeight={this.state.isAdvanceOpen}
          {...this.state.results!}
          />
        }
        { this.state.results && (
          <Footer
            selected={this.state.selected}
            links={this.state.results.links}
            wallet={this.props.wallet}
            orderService={this.props.orderService}
          />
        ) }
      </React.Fragment>
    );
  }
}

interface IndexPageState {
  results?: SearchResults,
  error?: Error,
  isAdvanceOpen: boolean;
  selected: SelectedOptions;
}

export interface IndexPageProps {
  journeyPlanner: JourneyPlanner;
  wallet: Wallet;
  orderService: OrderService;
}

export interface SelectedOptions {
  outward: string;
  inward: string | undefined;
  fareOptions: string[];
}