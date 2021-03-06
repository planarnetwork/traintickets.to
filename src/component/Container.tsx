import {Config, dev, production} from "../config/config";
import {JourneyPlanner} from "../service/JourneyPlanner/JourneyPlanner";
import {OrderService} from "../service/Order/OrderService";
import {Wallet} from "../service/Wallet/Wallet";
import * as memoize from "memoized-class-decorator";
import * as Planar from "@planar/ticket-wallet";
import * as React from 'react';
import Contract from "web3/eth/contract";
import axios from "axios";
import Web3 = require("web3");
import {IndexPage} from "./Index/IndexPage";
import {WalletPage} from "./Wallet/WalletPage";

export class Container {

  @memoize
  public get walletPage() {
    return () => (
      <WalletPage wallet={this.wallet}/>
    );
  }

  @memoize
  public get indexPage() {
    return () => (
      <IndexPage journeyPlanner={this.journeyPlanner} wallet={this.wallet} orderService={this.orderService} />
    );
  }

  @memoize
  public get journeyPlanner(): JourneyPlanner {
    return new JourneyPlanner(
      axios.create({ baseURL: this.config.journeyPlannerUrl })
    );
  }

  @memoize
  public get wallet(): Wallet {
    return new Wallet(this.web3, this.ticketWallet);
  }

  @memoize
  public get orderService(): OrderService {
    return new OrderService(axios.create({ baseURL: this.config.orderServiceUrl }));
  }

  @memoize
  public get ticketWallet(): Contract {
    return new this.web3.eth.Contract(Planar.TicketWallet.abi, Planar.TicketWallet.networks["3"].address);
  }

  @memoize
  public get web3(): Web3 {
    const web3 = (window as any).web3 || null;

    return new Web3(web3 ? web3.currentProvider : undefined);
  }

  @memoize
  public get config(): Config {
    return process.env.REACT_APP_ENV === "dev" ? dev : production;
  }

}