import {railcards} from "../../../config/railcards";
import * as React from "react";
import {Price} from "../../Price/Price";
import {FareUse} from "../../../service/JourneyPlanner/JourneyPlanner";
import autobind from "autobind-decorator";
import './FareInfo.css';

@autobind
export class FareInformation extends React.Component<FareInformationProps> {

  public render() {
    const id = this.props.fareOptionId;
    const fareOption = this.props.links[id];
    const fare = this.props.links[fareOption.fares[0].fare];

    return (
      <React.Fragment key={id}>
        <div className="fare-info">
          <h4 className="fare-info--header">{fare.ticketType} (CODE)</h4>
          <div className="fare-info--body">
            <div className="fare-info--row">
              <div className="fare-info--col1">
                <p className="fare-info--item">
                  <span className="fare-info--label">From </span>
                  {fare.origin}
                </p>
                <p className="fare-info--item">
                  <span className="fare-info--label">To </span>
                  {fare.destination}
                </p>
              </div>
              <div className="fare-info--col2">
                <p className="fare-info--item">
                  <span className="fare-info--label">Valid from</span>
                  dd-mmm-yyyy
                </p>
                <p className="fare-info--item">
                  <span className="fare-info--label">Valid to</span>
                  dd-mmm-yyyy
                </p>
              </div>
            </div>
            <p className="fare-info--notes">Route: {fare.route} (CODE)</p>
            <p className="fare-info--notes">Valid for outward for 1 day, return within 1 month (TODO)</p>
            {fare.restriction && (<a className="fare-info--link" target="_blank" href={"http://www.nationalrail.co.uk/" + fare.restriction}>Restrictions apply</a>)}
            <h5 className="fare-info--title">Price breakdown</h5>
            <ul className="fare-info--price-list">
              { fareOption.fares.map(this.renderTicketPrice) }
            </ul>
          </div>
          <div className="fare-info--footer text-right">
            Ticket price <Price value={fareOption.totalPrice} />
          </div>
        </div>
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
      <li className="clearfix fare-info--price-item" key={index}>
        <span className="pull-left">{adults}{comma}{children} {railcard} </span><span className="pull-right"> <span className="price-prefix">at</span> <Price value={fare.price} /></span>
      </li>
    )
  }
}

export interface FareInformationProps {
  links: any;
  fareOptionId: string;
}