import * as React from "react";
import {Modal} from "../../Modal/Modal";
import {Loader} from "../../Loader/Loader";
import {Error} from "../../Error/Error";
import {SelectedOptions} from "../../IndexPage";
import autobind from "autobind-decorator";
import {FareInformation} from "../FareInformation/FareInformation";
import {OrderData, OrderService} from "../../../../service/Order/OrderService";
import moment = require("moment");
import {Wallet} from "../../../../service/Wallet/Wallet";
import {Link} from "react-router-dom";

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

  private renderDetails(data: OrderData, links: any) {
    const trip = links[links[data.uri].items[0]];
    const items = trip.items.return
      ? [trip.items.return]
      : trip.items.returnSingle
        ? [trip.items.outwardSingle, trip.items.returnSingle]
        : [trip.items.outwardSingle];

    return (
      <div className="col-md-18 offset-md-3">
        { items.map((tickets, i) => <FareInformation links={this.state.links} tickets={tickets} key={i}/>) }

        <p className="text-right">Total price: {this.props.wallet.getEthPrice(data.price)} ether</p>
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
        <p>You can view your ticket collection references in your <Link to="/wallet">ticket wallet</Link> at any time.</p>
      </div>
    );
  }

  public async componentDidUpdate(prevProps: OrderSummaryProps, prevState: OrderSummaryState) {
    if (this.props.open === true && prevProps.open === false) {
      try {
        const order = await this.props.orderService.createOrder(this.props.selected);

        this.setState({ state: StateEnum.ORDER_CREATED, ...order });
      }
      catch (err) {
        this.setState({ state: StateEnum.CREATION_ERROR });
      }
    }
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
      const payment = await this.props.wallet.pay(this.state.data!, this.getDescription());

      this.setState({ state: StateEnum.PAYMENT_COMPLETE });

      const fulfilment = await this.props.wallet.getFulfilment(payment.events.Transfer.returnValues[2]);

      this.setState({ state: StateEnum.FULFILMENT_COMPLETE, fulfilment: fulfilment })
    }
    catch (err) {
      console.log(err);

      this.setState({ state: StateEnum.PAYMENT_ERROR });
    }
  }

  private getDescription() {
    const links: object = this.state.links!;
    const data = this.state.data! as OrderData;

    const order = links[data.uri];
    const trip = links[order.items[0]];
    const outwardJourney = links[trip.outwardJourney];
    const firstOutwardLeg = links[outwardJourney.legs[0]];
    const origin = links[firstOutwardLeg.origin].name.display;
    const lastOutwardLeg = links[outwardJourney.legs[outwardJourney.legs.length - 1]];
    const destination = links[lastOutwardLeg.destination].name.display;
    const outwardDate = moment(firstOutwardLeg.scheduledDeparture).format("DD-MMM-YYYY");

    let description = `${origin} to ${destination} - departing ${outwardDate}`;

    if (trip.returnJourney) {
      const returnJourney = links[trip.returnJourney];
      const firstReturnLeg = links[returnJourney.legs[0]];
      const returnDate = moment(firstReturnLeg.scheduledDeparture).format("DD-MMM-YYYY");

      description += `, returning ${returnDate}`;
    }

    return description;
  }
}


export interface OrderSummaryProps {
  wallet: Wallet;
  selected: SelectedOptions;
  open: boolean;
  onClose: () => any;
  orderService: OrderService;
}

export interface OrderSummaryState {
  state: StateEnum;
  data?: OrderData;
  links?: any;
  fulfilment?: string;
}
