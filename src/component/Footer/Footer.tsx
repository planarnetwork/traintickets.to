import * as React from 'react';
import {Price} from "./../Price/Price";
import './Footer.css';
import autobind from "autobind-decorator";
import {FareInformation} from "./FareInformation/FareInformation";
import {Modal} from "../Modal/Modal";

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
    const price = this.props.selectedFareOptions
      .reduce((total, id) => total + (this.props.links[id] ? this.props.links[id].totalPrice : 0), 0);

    return (
      <footer className="footer">
        <div className="footer-bg max">
          <div className="row">
            <div className="col-10">
              <p className="footer--copyright" title="all the years">
                &copy; traintickets.to
              </p>
            </div>
            <div className="col text-right">
              <div className="footer--total">
                <button className="footer--btn__info" type="button" onClick={this.openModal}>
                  <span className="sr-only">Open modal showing your selected ticket information</span>
                </button>
                <div className="footer--price-container">
                  <span className="footer--price">
                    Total <Price value={price}/>
                  </span>
                  <p className="footer--pax">all passengers</p>
                </div>
              </div>
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
      <Modal title="Your ticket details" onClose={this.closeModal} open={this.state.modalOpen}>
        { this.props.selectedFareOptions.map(id => (
          <FareInformation links={this.props.links} fareOptionId={id}/>
        )) }
      </Modal>
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
 selectedFareOptions: string[];
 links: any;
}

interface FooterState {
  popupOpen: boolean;
  modalOpen: boolean;
}