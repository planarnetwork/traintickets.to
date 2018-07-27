import * as React from 'react';
import {Price} from "../Price/Price";
import './Footer.css';
import autobind from "autobind-decorator";
import {SelectedOptions} from "../IndexPage";
import {OrderSummary} from "./OrderSummary/OrderSummary";
import {PaymentProvider} from "../../../service/Payment/PaymentProvider";
import {OrderService} from "../../../service/Order/OrderService";

@autobind
export class Footer extends React.Component<FooterProps, FooterState> {

  public state = {
    popupOpen: true,
    modalOpen: false
  };

  public closePopup() {
    this.setState({ popupOpen: false });
  }

  public openModal() {
    this.setState({ modalOpen: true });
  }

  public closeModal() {
    this.setState({ modalOpen: false });
  }

  public render() {
    const price = this.props.selected.fareOptions
      .reduce((total, id) => total + (this.props.links[id] ? this.props.links[id].totalPrice : 0), 0);

    return (
      <footer className="footer">
        <div className="footer-bg max">
          <div className="row">
            <div className="col-8">
              <p className="footer--planar">
                <span className="footer--planar-text">Part of the </span>
                <a href="https://planar.network">
                  <span className="sr-only">planar.network</span>
                  <img className="footer-planar" src="img/planar-network-logo.svg" alt="Planar Network Logo" />
                </a>
              </p>
            </div>
            <div className="col text-right">
                <button className="footer--btn" type="button" onClick={this.openModal}>
                  <span className="sr-only">Open modal showing your selected ticket information</span>
                  <p className="footer--btn-price">
                    Total <Price value={price}/>
                  </p>
                  <p className="footer--btn-pax">all passengers</p>
                </button>
            </div>
          </div>
          { this.state.popupOpen && this.renderPopup() }
        </div>
        <OrderSummary
          open={this.state.modalOpen}
          onClose={this.closeModal}
          selected={this.props.selected}
          paymentProvider={this.props.paymentProvider}
          orderService={this.props.orderService}
        />
      </footer>
    );
  }

  private renderPopup() {
    return (
      <div className="footer-pop">
        <p className="footer-pop--header">
          Total ticket price
        </p>
        <p className="footer-pop--message">
          The total of your selected tickets for <span className="bold">ALL</span> passengers is shown below.
        </p>
        <button type="button" className="footer-pop--close" onClick={this.closePopup}>
          <span className="sr-only">close</span>
        </button>
      </div>
    )
  }

}

export interface FooterProps {
 selected: SelectedOptions;
 paymentProvider: PaymentProvider;
 orderService: OrderService;
 links: any;
}

interface FooterState {
  popupOpen: boolean;
  modalOpen: boolean;
}