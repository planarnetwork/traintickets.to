import * as React from 'react';
import {Fares} from "../../Component/Fares/Fares";
import {Graph} from "../../Component/Graph/Graph";
import {Layout} from "../Common/Layout";
import {Search} from "../../Component/Search/Search";
import {JourneyPlanner} from "../../Service/JourneyPlanner/JourneyPlanner";

export class IndexPage extends React.Component {
  private readonly journeyPlanner = new JourneyPlanner();

  public render() {
    return (
      <Layout>
        <Search listener={this.journeyPlanner.search}/>
        <Graph/>
        <Fares faresEmitter={this.journeyPlanner}/>
      </Layout>
    );
  }
}


