import * as React from 'react';
import {JourneyPlanResults} from "../../component/JourneyPlanResults/JourneyPlanResults";
import {Layout} from "../Common/Layout";
import {defaultQueryState, Search, SearchState} from "../../component/Search/Search";
import {JourneyPlanner, SearchResults} from "../../service/JourneyPlanner/JourneyPlanner";
import autobind from "autobind-decorator";
import {debounce} from "typescript-debounce-decorator";
import {config} from "../../config/config";
import axios from 'axios';
import {Footer} from "../../component/Footer/Footer";

@autobind
export class IndexPage extends React.Component<{}, IndexPageState> {

  private readonly journeyPlanner = new JourneyPlanner(
    axios.create({ baseURL: config.journeyPlannerUrl })
  );

  public state = {
    results: {
      links: {},
      query: defaultQueryState,
      response: {
        outward: [],
        inward: [],
        fares: {},
        cheapestOutward: "",
        cheapestInward: ""
      }
    },
    error: undefined,
    isAdvanceOpen: defaultQueryState.advancedSearch,
    priceOfSelected: 0
  };

  @debounce(200, { leading: false })
  public async onSearch(query: SearchState) {
    const results = await this.journeyPlanner.search(query);

    this.setState(results as any);
  };

  public async onOpenAdvanceControls(isAdvanceOpen: boolean) {
    this.setState({ isAdvanceOpen });
  }

  public onPriceChange(priceOfSelected: number) {
    this.setState({ priceOfSelected });
  }

  public render() {
    return (
      <Layout>
        <Search onSubmit={this.onSearch} onOpen={this.onOpenAdvanceControls}/>
        { this.state.error && <div>Error</div> }
        { this.state.results && <JourneyPlanResults
            onPriceChange={this.onPriceChange}
            lessHeight={this.state.isAdvanceOpen}
            {...this.state.results!}
          />
        }
        <Footer price={this.state.priceOfSelected}/>
      </Layout>
    );
  }
}

interface IndexPageState {
  results?: SearchResults,
  error?: Error,
  isAdvanceOpen: boolean;
  priceOfSelected: number;
}
