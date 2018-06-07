import * as React from 'react';
import {Fare, Fares} from "../../component/Fares/Fares";
import {Graph} from "../../component/Graph/Graph";
import {Layout} from "../Common/Layout";
import {Search} from "../../component/Search/Search";
import {JourneyPlanner} from "../../service/JourneyPlanner/JourneyPlanner";
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
    fares: [],
    error: null
  };

  @debounce(200, { leading: false })
  public async onSearch(query: SearchQuery) {
    const reset = { error: null, fares: [] };

    this.setState(Object.assign(reset, await this.journeyPlanner.search(query)));
  };

  public render() {
    return (
      <Layout>
        <Search onSubmit={this.onSearch}/>
        <Graph/>
        { this.state.error ? <div>Error</div> : <Fares fares={this.state.fares}/> }
      </Layout>
    );
  }
}

interface IndexPageState {
  fares: Fare[];
  error: any
}
