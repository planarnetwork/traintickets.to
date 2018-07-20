import * as React from "react";
import {Price} from "../../Price/Price";
import autobind from "autobind-decorator";
import './FareInfo.css';
import * as moment from "moment";

@autobind
export class FareInformation extends React.Component<FareInformationProps> {

  public render() {
    const links = this.props.links;
    const id = this.props.tickets[0];
    const ticket = links[id];
    const fare: Fare = links[ticket.fare];
    const validFrom = moment(ticket.outwardValidity.validFrom);
    const validUntil = moment(
      ticket.returnValidity ? ticket.returnValidity.validUntil : ticket.outwardValidity.validUntil
    );


    return (
      <React.Fragment key={id}>
        <div className="fare-info">
          <h4 className="fare-info--header">{links[fare.ticketType].name.display} ({links[fare.ticketType].code})</h4>
          <div className="fare-info--body">
            <div className="fare-info--row">
              <div className="fare-info--col1">
                <p className="fare-info--item">
                  <span className="fare-info--label">From </span>
                  {links[fare.origin].name.display}
                </p>
                <p className="fare-info--item">
                  <span className="fare-info--label">To </span>
                  {links[fare.destination].name.display}
                </p>
              </div>
              <div className="fare-info--col2">
                <p className="fare-info--item">
                  <span className="fare-info--label">Valid from</span>
                  {validFrom.format("DD-MMM-YYYY")}
                </p>
                <p className="fare-info--item">
                  <span className="fare-info--label">Valid to</span>
                  {validUntil.format("DD-MMM-YYYY")}
                </p>
              </div>
            </div>
            {links[fare.route].code !== "01000" && <p className="fare-info--notes">{links[fare.route].name.display} ({links[fare.route].code})</p>}
            {fare.restrictionCode && (<a className="fare-info--link" target="_blank" href={"http://www.nationalrail.co.uk/" + fare.restrictionCode}>Restrictions apply</a>)}
            <h5 className="fare-info--title">Price breakdown</h5>
            <ul className="fare-info--price-list">
              { this.props.tickets.map((ticketId, i) => this.renderTicketPrice(links[ticketId], i)) }
            </ul>
          </div>
          <div className="fare-info--footer text-right">
            Ticket price <Price value={this.props.tickets.reduce((total, ticketId) => total + links[links[ticketId].fare].price, 0)}/>
          </div>
        </div>
      </React.Fragment>
    )
  }

  private renderTicketPrice(ticket: Ticket, index: number) {
    const fare: Fare = this.props.links[ticket.fare];
    const adults = ticket.adults === 1 ? `${ticket.adults} x adult` : ticket.adults > 1 && `${ticket.adults} x adults`;
    const children = ticket.children === 1 ? `${ticket.children} x child` : ticket.children > 1 && `${ticket.children} x children`;
    const railcard = fare.railcard && ` (${this.props.links[fare.railcard].name.display})`;
    const comma = adults && children && ", ";

    return (
      <li className="clearfix fare-info--price-item" key={index}>
        <span className="pull-left">{adults}{comma}{children} {railcard} </span><span className="pull-right"> <span className="price-prefix">at</span> <Price value={fare.price} /></span>
      </li>
    )
  }
}

export interface FareInformationProps {
  links: any;
  tickets: string[];
}

interface Ticket {
  adults: number;
  children: number;
  fare: string;
}

interface Fare {
  origin: string;
  destination: string;
  route: string;
  price: number;
  railcard: string;
  restrictionCode: string | null;
  ticketType: string;
}