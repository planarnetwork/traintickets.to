import * as React from 'react';
import {Price} from "./../Price/Price";
import './Footer.css';
import './Modal.css';
import autobind from "autobind-decorator";
import {FareUse} from "../../service/JourneyPlanner/JourneyPlanner";
import {railcards} from "../../config/railcards";
import {getLocation} from "../../config/locations";

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

  public handleKeyDown(event: any): void {
    if (event.keyCode === 27) {
      this.closeModal();
      event.preventDefault();
    }
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

  public renderPopup() {
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

  public renderModal() {
    return (
      <div
        className="modal--content"
        aria-modal={true}
        tabIndex={0}
        role="dialog"
        aria-label="Ticket modal"
        onKeyDown={this.handleKeyDown}
        aria-labelledby="modal_title"
        auto-focus="true"
        >
        <div className="modal--header">
          <button type="button" className="modal--btn__close" onClick={this.closeModal}>
            <span className="sr-only">Close</span>
          </button>
          <h4 id="modal_title" className="modal--title">Your ticket details</h4>
        </div>
        <div className="modal--body">
          { this.props.selectedFareOptions.map(this.renderFareOption) }
        </div>
        <div className="modal--footer">
          <button
            type="button"
            className="modal--footer-btn"
            onClick={this.closeModal}
          >
          Close
          </button>
        </div>
      </div>
    )
  }

  private renderFareOption(id: string) {
    const fareOption = this.props.links[id];
    const fare = this.props.links[fareOption.fares[0].fare];
    const route = this.props.links[fare.route];
    const ticketType = this.props.links[fare.ticketType];
    const origin = getLocation(this.props.links[fare.origin].crs || this.props.links[fare.origin].nlc);
    const destination = getLocation(this.props.links[fare.destination].crs || this.props.links[fare.destination].nlc);

    return (
      <React.Fragment key={id}>
        <h2>Tickets</h2>
        { fareOption.fares.map(this.renderTicketPrice) }
        <p>Total: £{(fareOption.totalPrice / 100).toFixed(2)}</p>
        <h2>Ticket Information</h2>
        <p>Origin: {origin.name}</p>
        <p>Destination: {destination.name}</p>
        <p>Route: {route.name} ({route.code})</p>
        <p>Ticket type: {ticketType.name} ({ticketType.code})</p>
        <p>Valid for outward for 1 day, return within 1 month (TODO)</p>
        <p>{fare.restriction ? (<a target="_blank" href={"http://www.nationalrail.co.uk/" + fare.restriction}>Restrictions apply</a>) : ""}</p>
      </React.Fragment>
    )
  }

  private renderTicketPrice(fareUse: FareUse, index: number) {
    const fare = this.props.links[fareUse.fare];
    const adults = fareUse.adults === 1 ? `${fareUse.adults} x adult` : fareUse.adults > 1 ? `${fareUse.adults} x adults` : "";
    const children = fareUse.children === 1 ? `${fareUse.children} x child` : fareUse.children > 1 ? `${fareUse.children} x children` : "";
    const railcard = fare.railcard ? ` (${railcards[fare.railcard]})` : "";
    const comma = adults && children ? "," : "";

    return (
      <p key={index}>{adults}{comma}{children} {railcard} @ £{(fare.price / 100).toFixed(2)}</p>
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