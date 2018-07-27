import {Config, dev, production} from "../config/config";
import {JourneyPlanner} from "./JourneyPlanner/JourneyPlanner";
import {OrderService} from "./Order/OrderService";
import {PaymentProvider} from "./Payment/PaymentProvider";
import * as memoize from "memoized-class-decorator";
import * as Planar from "@planar/ticket-wallet";
import * as React from 'react';
import Contract from "web3/eth/contract";
import axios from "axios";
import Web3 = require("web3");
import {IndexPage} from "../component/Index/IndexPage";

export class Container {

  @memoize
  public get indexPage() {
    return () => (
      <IndexPage journeyPlanner={this.journeyPlanner} paymentProvider={this.paymentProvider} orderService={this.orderService} />
    );
  }

  @memoize
  public get journeyPlanner(): JourneyPlanner {
    return new JourneyPlanner(
      axios.create({ baseURL: this.config.journeyPlannerUrl })
    );
  }

  @memoize
  public get paymentProvider(): PaymentProvider {
    return new PaymentProvider(this.web3, this.ticketWallet);
  }

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