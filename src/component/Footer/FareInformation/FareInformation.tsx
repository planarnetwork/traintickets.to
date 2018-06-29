import {getLocation} from "../../../config/locations";
import {railcards} from "../../../config/railcards";
import * as React from "react";
import {Price} from "../../Price/Price";
import {FareUse} from "../../../service/JourneyPlanner/JourneyPlanner";
import autobind from "autobind-decorator";

@autobind
export class FareInformation extends React.Component<FareInformationProps> {

  public render() {
    const id = this.props.fareOptionId;
    const fareOption = this.props.links[id];
    const fare = this.props.links[fareOption.fares[0].fare];
    const route = this.props.links[fare.route];
    const ticketType = this.props.links[fare.ticketType];
    const origin = getLocation(this.props.links[fare.origin].crs || this.props.links[fare.origin].nlc);
    const destination = getLocation(this.props.links[fare.destination].crs || this.props.links[fare.destination].nlc);

    return (
      <React.Fragment key={id}>
        <h4>Tickets</h4>
        <ul>
          { fareOption.fares.map(this.renderTicketPrice) }
        </ul>
        <p>Total: <Price value={fareOption.totalPrice} /></p>
        <h4>Ticket Information</h4>
        <p>Origin: {origin.name}</p>
        <p>Destination: {destination.name}</p>
        <p>Route: {route.name} ({route.code})</p>
        <p>Ticket type: {ticketType.name} ({ticketType.code})</p>
        <p>Valid for outward for 1 day, return within 1 month (TODO)</p>
        {fare.restriction && (<a target="_blank" href={"http://www.nationalrail.co.uk/" + fare.restriction}>Restrictions apply</a>)}
      </React.Fragment>
    )
  }

  private renderTicketPrice(fareUse: FareUse, index: number) {
    const fare = this.props.links[fareUse.fare];
    const adults = fareUse.adults === 1 ? `${fareUse.adults} x adult` : fareUse.adults > 1 && `${fareUse.adults} x adults`;
    const children = fareUse.children === 1 ? `${fareUse.children} x child` : fareUse.children > 1 && `${fareUse.children} x children`;
    const railcard = fare.railcard && ` (${railcards[fare.railcard]})`;
    const comma = adults && children && ", ";

    return (
      <li className="clearfix" key={index}>
        {adults}{comma}{children} {railcard}<span className="pull-right"> @<Price value={fare.price} /></span>
      </li>
    )
  }
}

export interface FareInformationProps {
  links: any;
  fareOptionId: string;
}