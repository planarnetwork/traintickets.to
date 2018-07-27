import * as React from "react";
import {Modal} from "../../Modal/Modal";
import {Loader} from "../../Loader/Loader";
import {Error} from "../../Error/Error";
import {config} from "../../../../config/config";
import axios from "axios";
import {SelectedOptions} from "../../IndexPage";
import autobind from "autobind-decorator";
import {FareInformation} from "../FareInformation/FareInformation";
import {PaymentProvider} from "../../../../service/Payment/PaymentProvider";

enum StateEnum {
  CREATING_ORDER,
  CREATION_ERROR,
  ORDER_CREATED,
  PROCESSING_PAYMENT,
  PAYMENT_ERROR,
  PAYMENT_COMPLETE,
  FULFILMENT_COMPLETE
}

const defaultState = {
  state: StateEnum.CREATING_ORDER,
  data: undefined,
  links: undefined,
  fulfilment: undefined
};

@autobind
export class OrderSummary extends React.Component<OrderSummaryProps, OrderSummaryState> {

  public state = defaultState;
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
        title={this.state.state === StateEnum.CREATION_ERROR ? "Oh dear" : "Your ticket details"}
        onClose={this.onClose}
        onCallToAction={this.state.state === StateEnum.ORDER_CREATED ? this.onPay : undefined}
        callToActionText={this.state.state === StateEnum.ORDER_CREATED ? "Pay" : undefined}
        open={this.props.open}
      >
        <div className="row">{ this.getContent() }</div>
      </Modal>
    )
  }

  private getContent() {
    switch (this.state.state) {
      case StateEnum.CREATING_ORDER:
        return this.renderLoader("Hold tight, we're getting your ticket details.");
      case StateEnum.ORDER_CREATED:
        return this.renderDetails(this.state.data!, this.state.links);
      case StateEnum.CREATION_ERROR:
        return this.renderError("I'm sorry, we couldn't get your ticket details. Did you select a journey in the past?");
      case StateEnum.PROCESSING_PAYMENT:
        return this.renderLoader("Processing payment... this could take some time.");
      case StateEnum.PAYMENT_ERROR:
        return this.renderError("I'm sorry, we couldn't process your payment. Do you have MetaMask installed?");
      case StateEnum.PAYMENT_COMPLETE:
        return this.renderLoader("Payment complete, awaiting collection reference");
      case StateEnum.FULFILMENT_COMPLETE:
        return this.renderFulfilmentComplete();
      default:
        return this.renderLoader("Loading...");
    }
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

        <p className="text-right">Total price: {this.props.paymentProvider.getEthPrice(data.price)} ether</p>
      </div>
    );
  }

  private renderLoader(text: string) {
    return(
      <div className="col-md-24">
        <Loader text={text}/>
      </div>
    );
  }

  private renderError(text: string) {
    return(
      <div className="col-md-24">
        <Error text={text} />
      </div>
    );
  }

  private renderFulfilmentComplete() {
    return(
      <div className="col-md-24">
        <h2>Purchase complete</h2>
        <p>Your order has been fulfilled and can now be collected at any UK station with a TVM.</p>
        <h3>Your collection reference: {this.state.fulfilment}</h3>
      </div>
    );
  }

  public async componentDidUpdate(prevProps: OrderSummaryProps, prevState: OrderSummaryState) {
    if (this.props.open === true && prevProps.open === false) {
      try {
        const order = await this.createOrder();

        this.setState({ state: StateEnum.ORDER_CREATED, ...order });
      }
      catch (err) {
        this.setState({ state: StateEnum.CREATION_ERROR });
      }
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
    this.setState(defaultState);

    this.props.onClose();
  }

  private async onPay() {
    if (!this.state.data) {
      return;
    }

    this.setState({ state: StateEnum.PROCESSING_PAYMENT });

    try {
      const payment = await this.props.paymentProvider.pay(this.state.data!);

      this.setState({ state: StateEnum.PAYMENT_COMPLETE });

      const fulfilment = await this.props.paymentProvider.getFulfilment(payment.events.Transfer.returnValues[2]);

      this.setState({ state: StateEnum.FULFILMENT_COMPLETE, fulfilment: fulfilment })
    }
    catch (err) {
      console.log(err);

      this.setState({ state: StateEnum.PAYMENT_ERROR });
    }
  }
}


export interface OrderSummaryProps {
  paymentProvider: PaymentProvider;
  selected: SelectedOptions;
  open: boolean;
  onClose: () => any;
}

export interface OrderSummaryState {
  state: StateEnum;
  data?: OrderResponse;
  links?: any;
  fulfilment?: string;
}

export interface OrderResponse {
  price: string;
  signature: string;
  uri: string;
  expiry: number;
  address: string;
}
