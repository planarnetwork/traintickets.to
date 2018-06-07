import * as React from 'react';
import {Journey, SearchResults} from "../../service/JourneyPlanner/JourneyPlanner";
import * as moment from "moment";
import autobind from "autobind-decorator";

@autobind
export class Fares extends React.Component<SearchResults, FaresState> {

  public state = {
    outwardSelected: "",
    inwardSelected: ""
  };

  public static getDerivedStateFromProps(props: SearchResults) {
    return {
      outwardSelected: props.response.cheapestOutward,
      inwardSelected: props.response.cheapestInward
    };
  }

  public render() {
    return (
      <section className="fares">
        <div className="container">

          { this.props.response.inward.length > 0
              ? this.renderJourneys("fares-out", this.props.response.outward, this.props.response.fares, this.state.outwardSelected)
              : this.renderJourneys("fares-single", this.props.response.outward, this.props.response.fares, this.state.outwardSelected) }

          { this.props.response.inward.length > 0
              ? this.renderJourneys("return", this.props.response.inward, (this.props.response.fares[this.state.outwardSelected] as any).with, this.state.inwardSelected)
              : "" }

        </div>
      </section>
    );
  }

  public renderJourneys(className: string, journeys: Journey[], journeyPrice: JourneyPriceIndex, selected: string) {
    return (
      <div className={className}>
        <h3 className="fares-title bold">OUTBOUND - London Charing Cross to Sevenoaks</h3>
        <table className="fare-list clearfix">
          <tbody>
            { journeys.map(j => this.renderJourney(j, journeyPrice, selected)) }
          </tbody>
        </table>
      </div>
    )
  }

  public renderJourney(journey: Journey, journeyPrice: JourneyPriceIndex, selected: string) {
    return (
      <tr key={journey.id} className={journey.id === selected ? "selected-journey" : ""}>
        <td>{journey.origin}</td>
        <td>{journey.destination}</td>
        <td>{moment.unix(journey.departureTime).utc().format(moment.HTML5_FMT.TIME)}</td>
        <td>{moment.unix(journey.arrivalTime).utc().format(moment.HTML5_FMT.TIME)}</td>
        <td>{moment.unix(journey.arrivalTime - journey.departureTime).utc().format("H[hrs] m[min]")}</td>
        <td>{journeyPrice[journey.id].price}</td>
      </tr>
    );
  }

}

interface FaresState {
  outwardSelected: string;
  inwardSelected: string;
}

interface JourneyPriceIndex {
  [journeyId: string]: {
    price: number;
  }
}