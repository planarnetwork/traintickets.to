import * as React from "react";
import {Modal} from "../../Modal/Modal";
import {Loader} from "../../Loader/Loader";
import {config} from "../../../config/config";
import axios from "axios";
import {SelectedOptions} from "../../../page/Index/IndexPage";
import autobind from "autobind-decorator";
import {FareInformation} from "../FareInformation/FareInformation";
import Web3 = require("web3");
const {TicketWallet} = require("@planar/ticket-wallet");

@autobind
export class OrderSummary extends React.Component<OrderSummaryProps, OrderSummaryState> {

  public state = {
    links: undefined,
    data: undefined
  };

  private client = axios.create({ baseURL: config.orderServiceUrl });

  public render() {
    return (
      <div className={this.props.open ? 'modal--bg is-active' : 'modal--bg'}>
        {this.props.open && this.renderModal() }
      </div>
    );
  }

  private renderModal() {
    return (
      <Modal
        title="Your ticket details"
        onClose={this.onClose}
        onCallToAction={this.onPay}
        callToActionText={"Pay"}
        open={this.props.open}
      >
        <div className="row">
          { this.state.links ? this.renderDetails(this.state.data!, this.state.links) : this.renderLoader() }
        </div>
      </Modal>

    )
  }

  private renderDetails(data: OrderResponse, links: any) {
    const trip = links[links[data.uri].items[0]];
    const items = trip.items.return
      ? [trip.items.return]
      : trip.items.returnSingle
        ? [trip.items.outwardSingle, trip.items.returnSingle]
        : [trip.items.outwardSingle];

    return (
      <div className="col-md-18 offset-md-3">
        { items.map((tickets, i) => <FareInformation links={this.state.links} tickets={tickets} key={i}/>) }

        <p className="text-right">Total price: {data.price} wei</p>
      </div>
    );
  }

  private renderLoader() {
    return(
      <div className="col-md-24">
        <Loader />
      </div>
    );
  }

  public async componentDidUpdate(prevProps: OrderSummaryProps, prevState: OrderSummaryState) {
    if (this.props.open === true && prevProps.open === false) {
      this.setState(await this.createOrder());
    }
  }

  private async createOrder() {
    const request: any = {
      "items": {
        "outward": {
          "journey": this.props.selected.outward
        },
        "fares": {}
      }
    };

    if (this.props.selected.inward) {
      request.items.inward = { journey: this.props.selected.inward };

      if (this.props.selected.fareOptions.length === 1) {
        request.items.fares.return = this.props.selected.fareOptions[0];
      }
      else {
        request.items.fares.outwardSingle = this.props.selected.fareOptions[0];
        request.items.fares.inwardSingle = this.props.selected.fareOptions[1];
      }
    }
    else {
      request.items.fares.outwardSingle = this.props.selected.fareOptions[0];
    }

    const response = await this.client.post("/order", request);

    return response.data;
  }

  private onClose() {
    this.setState({ data: undefined, links: undefined });
    this.props.onClose();
  }

  private async onPay() {
    if (!this.state.data) {
      return;
    }

    const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/VfWYr7OjdspjLol0LX6t"));
    const contract = new web3.eth.Contract(TicketWallet.abi, TicketWallet.networks["3"].address);
    const order: OrderResponse = this.state.data!;

    try {
      const response = await contract.methods.createTicket(
        web3.utils.fromAscii("description"),
        order.expiry,
        order.price,
        order.address,
        web3.utils.fromAscii(order.uri),
        order.signature,
      ).send({ value: order.price });

      console.log(response);
    }
    catch (err) {
      console.log(err);
    }
  }
}


export interface OrderSummaryProps {
  selected: SelectedOptions;
  open: boolean;
  onClose: () => any;
}

export interface OrderSummaryState {
  data?: OrderResponse;
  links?: any;
}

interface OrderResponse {
  price: string;
  signature: string;
  uri: string;
  expiry: number;
  address: string;
}