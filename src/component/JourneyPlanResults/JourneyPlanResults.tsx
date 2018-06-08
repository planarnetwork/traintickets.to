import * as React from 'react';
import {
  Journey,
  SearchResults,
} from "../../service/JourneyPlanner/JourneyPlanner";
import * as moment from "moment";
import autobind from "autobind-decorator";
import "./JourneyPlanResults.css";

@autobind
export class JourneyPlanResults extends React.Component<SearchResults, JourneyPlanResultsState> {

  public state = {
    outwardSelected: "",
    inwardSelected: ""
  };

  public static getDerivedStateFromProps(props: SearchResults, state: JourneyPlanResultsState) {
    const outwardValid = props.response.fares[state.outwardSelected];
    const outwardSelected = outwardValid ? state.outwardSelected : props.response.cheapestOutward;
    const outwardFares = props.response.fares[outwardSelected] as any;
    const inwardValid = outwardFares && outwardFares.with && outwardFares.with[state.inwardSelected];
    const inwardSelected = inwardValid ? state.inwardSelected : props.response.cheapestInward;

    return { outwardSelected, inwardSelected };
  }

  public render() {
    return (
      <section className="fares">
        <div className="container">
          <div className="row">
          { this.props.response.outward.length === 0 && <div className="fares-results col-sm-24 center">Add some search criteria to see results</div> }

          { console.log(this.props.response.outward.length) }
          { this.props.response.inward.length > 0
              ? this.renderJourneys("fares-out col-md-12", this.props.response.outward, this.props.response.fares, "outwardSelected")
              : this.props.response.outward.length > 0 && this.renderJourneys("fares-single col-md-16 offset-md-4 col-lg-12 offset-lg-6", this.props.response.outward, this.props.response.fares, "outwardSelected") }

          { this.props.response.inward.length > 0
              && this.renderJourneys("fares-return col-md-12", this.props.response.inward, (this.props.response.fares[this.state.outwardSelected] as any).with, "inwardSelected") }

          </div>
        </div>
      </section>
    );
  }

  public renderJourneys(className: string, journeys: Journey[], journeyPrice: JourneyPriceIndex, selected: keyof JourneyPlanResultsState) {
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

  public renderJourney(journey: Journey, journeyPrice: JourneyPriceIndex, selected: keyof JourneyPlanResultsState) {
    return (
      <tr onClick={this.onSelect(journey.id, selected)} key={journey.id} className={journey.id === this.state[selected] ? "selected" : ""}>
        <td>{journey.origin}</td>
        <td>{journey.destination}</td>
        <td>{moment.unix(journey.departureTime).utc().format(moment.HTML5_FMT.TIME)}</td>
        <td>{moment.unix(journey.arrivalTime).utc().format(moment.HTML5_FMT.TIME)}</td>
        <td>{moment.unix(journey.arrivalTime - journey.departureTime).utc().format("H[hrs] m[min]")}</td>
        <td>{journeyPrice[journey.id].price}</td>
      </tr>
    );
  }

  public onSelect(journeyId: string, stateField: keyof JourneyPlanResultsState) {
    return () => this.setState({ [stateField]: journeyId } as Pick<JourneyPlanResultsState, keyof JourneyPlanResultsState>);
  }

}

interface JourneyPlanResultsState {
  outwardSelected: string;
  inwardSelected: string;
}

interface JourneyPriceIndex {
  [journeyId: string]: {
    price: number;
  }
}