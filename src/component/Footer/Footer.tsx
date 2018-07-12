import * as React from 'react';
import {Price} from "./../Price/Price";
import './Footer.css';
import autobind from "autobind-decorator";
import {FareInformation} from "./FareInformation/FareInformation";
import {Modal} from "../Modal/Modal";
import axios from "axios";
import {config} from "../../config/config";
import {SelectedOptions} from "../../page/Index/IndexPage";

@autobind
export class Footer extends React.Component<FooterProps, FooterState> {

  public state = {
    popupOpen: true,
    modalOpen: false
  };

  private client = axios.create({ baseURL: config.orderServiceUrl });

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
            <div className="col-7">
              <p className="footer--copyright" title="all the years">
                &copy; traintickets.to
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
        <div className={this.state.modalOpen ? 'modal--bg is-active' : 'modal--bg'}>
          {this.state.modalOpen && this.renderModal() }
        </div>
      </footer>
    );
  }

  private renderModal() {
    return (
      <Modal
        title="Your ticket details"
        onClose={this.closeModal}
        onCallToAction={this.onBuy}
        callToActionText={"Pay"}
        open={this.state.modalOpen}
      >
        { this.props.selected.fareOptions.map(id => (
          <FareInformation links={this.props.links} fareOptionId={id} key={id}/>
        )) }
      </Modal>
    );
  }

  private async onBuy() {
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

    console.log(response);
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
 links: any;
}

interface FooterState {
  popupOpen: boolean;
  modalOpen: boolean;
}