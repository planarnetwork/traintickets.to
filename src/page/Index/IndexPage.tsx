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
import Web3 = require("web3");
import {PaymentProvider} from "../../service/Payment/PaymentProvider";
const {TicketWallet} = require("@planar/ticket-wallet");

// declared globally by metamask
declare var web3: any;
const w3 = new Web3(web3.currentProvider);
const contract = new w3.eth.Contract(TicketWallet.abi, TicketWallet.networks["3"].address);

@autobind
export class IndexPage extends React.Component<{}, IndexPageState> {

  private readonly journeyPlanner = new JourneyPlanner(
    axios.create({ baseURL: config.journeyPlannerUrl })
  );

  private readonly paymentProvider = new PaymentProvider(w3, contract);

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
    const results = await this.journeyPlanner.search(query);

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
      <Layout>
        <Search onSubmit={this.onSearch} onOpen={this.onOpenAdvanceControls}/>
        { this.state.error && (
          <div className="error">
            <h2 className="error--title">Oh dear.</h2>
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
        { this.state.results && <Footer selected={this.state.selected} links={this.state.results.links} paymentProvider={this.paymentProvider}/> }
      </Layout>
    );
  }
}

interface IndexPageState {
  results?: SearchResults,
  error?: Error,
  isAdvanceOpen: boolean;
  selected: SelectedOptions;
}

export interface SelectedOptions {
  outward: string;
  inward: string | undefined;
  fareOptions: string[];
}