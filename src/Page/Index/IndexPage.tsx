import * as React from 'react';
import {Fare, Fares} from "../../Component/Fares/Fares";
import {Graph} from "../../Component/Graph/Graph";
import {Layout} from "../Common/Layout";
import {Search} from "../../Component/Search/Search";
import {JourneyPlanner} from "../../Service/JourneyPlanner/JourneyPlanner";
import {SearchQuery} from "../../Component/Search/SearchContext";
import autobind from "autobind-decorator";
import {debounce} from "typescript-debounce-decorator";

@autobind
export class IndexPage extends React.Component<{}, IndexPageState> {

  private readonly journeyPlanner = new JourneyPlanner();

  public state = {
    fares: []
  };

  @debounce(200, { leading: false })
  public async onSearch(query: SearchQuery) {
    this.setState({
      fares: await this.journeyPlanner.search(query)
    });
  };

  public render() {
    return (
      <Layout>
        <Search onSubmit={this.onSearch}/>
        <Graph/>
        <Fares fares={this.state.fares}/>
      </Layout>
    );
  }
}

interface IndexPageState {
  fares: Fare[];
}
