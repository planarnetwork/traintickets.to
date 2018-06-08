import * as React from 'react';
import {JourneyPlanResults} from "../../component/JourneyPlanResults/JourneyPlanResults";
import {Layout} from "../Common/Layout";
import {Search, SearchState} from "../../component/Search/Search";
import {ErrorResponse, JourneyPlanner, SearchResults} from "../../service/JourneyPlanner/JourneyPlanner";
import autobind from "autobind-decorator";
import {debounce} from "typescript-debounce-decorator";
import {config} from "../../config/config";
import axios from 'axios';

@autobind
export class IndexPage extends React.Component<{}, IndexPageState> {

  private readonly journeyPlanner = new JourneyPlanner(
    axios.create({ baseURL: config.journeyPlannerUrl })
  );

  public state = {
    links: {},
    response: {
      outward: [],
      inward: [],
      fares: {},
      cheapestOutward: "",
      cheapestInward: ""
    },
    error: null
  };

  @debounce(200, { leading: false })
  public async onSearch(query: SearchState) {
    const reset = { error: undefined, response: undefined, links: undefined };
    const results = await this.journeyPlanner.search(query);

    this.setState(Object.assign(reset, results));
  };

  public render() {
    return (
      <Layout>
        <Search onSubmit={this.onSearch}/>
        { this.state.error ? <div>Error</div> : <JourneyPlanResults {...this.state}/> }
      </Layout>
    );
  }
}

type IndexPageState = SearchResults | ErrorResponse;