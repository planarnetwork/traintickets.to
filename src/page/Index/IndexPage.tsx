import * as React from 'react';
import {Fares} from "../../component/Fares/Fares";
import {Layout} from "../Common/Layout";
import {Search} from "../../component/Search/Search";
import {ErrorResponse, JourneyPlanner, SearchResults} from "../../service/JourneyPlanner/JourneyPlanner";
import {SearchQuery} from "../../component/Search/SearchContext";
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
  public async onSearch(query: SearchQuery) {
    const reset = { error: undefined, response: undefined, links: undefined };
    const results = await this.journeyPlanner.search(query);

    this.setState(Object.assign(reset, results));
  };

  public render() {
    return (
      <Layout>
        <Search onSubmit={this.onSearch}/>
        { this.state.error ? <div>Error</div> : <Fares {...this.state}/> }
      </Layout>
    );
  }
}

type IndexPageState = SearchResults | ErrorResponse;