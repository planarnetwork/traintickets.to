import * as React from 'react';
import {
  Journey,
  SearchResults,
} from "../../service/JourneyPlanner/JourneyPlanner";
import * as moment from "moment";
import autobind from "autobind-decorator";
import "./JourneyPlanResults.css";
import {JourneyDetails} from "./JourneyDetails/JourneyDetails";

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
          { this.props.response.outward.length === 0  ? this.renderNoResults() : this.renderResults() }
          </div>
        </div>
      </section>
    );
  }

  public renderResults() {
    const isReturn = this.props.response.inward.length > 0;
    const classes = isReturn ? "col-md-12" : "col-md-16 offset-md-4 col-lg-12 offset-lg-6";
    const inwardJourneyFares = this.props.response.fares[this.state.outwardSelected] as any;

    return (
      <React.Fragment>
        { this.renderJourneys(classes, this.props.response.outward, this.props.response.fares, "outwardSelected") }
        { isReturn && this.renderJourneys(classes, this.props.response.inward, inwardJourneyFares.with, "inwardSelected") }
      </React.Fragment>
    )
  }

  public renderNoResults() {
    return <div className="fares-results col-sm-24 center">Add some search criteria to see results</div>;
  }

  public renderJourneys(className: string, journeys: Journey[], journeyPrice: JourneyPriceIndex, selected: keyof JourneyPlanResultsState) {
    return (
      <div className={className}>
        <h3 className="fares-title bold">OUTBOUND - London Charing Cross to Sevenoaks</h3>
        <ol className="fare-list clearfix">
            { journeys.map(j => this.renderJourney(j, journeyPrice, selected)) }
        </ol>
      </div>
    )
  }

  public renderJourney(journey: Journey, journeyPrice: JourneyPriceIndex, selected: keyof JourneyPlanResultsState) {
    return (
      <li onClick={this.onSelect(journey.id, selected)} key={journey.id} className={journey.id === this.state[selected] ? "selected" : ""}>
        <div>
          <span>{journey.origin}</span>
          <span>{journey.destination}</span>
          <span>{moment.unix(journey.departureTime).utc().format(moment.HTML5_FMT.TIME)}</span>
          <span>{moment.unix(journey.arrivalTime).utc().format(moment.HTML5_FMT.TIME)}</span>
          <span>{moment.unix(journey.arrivalTime - journey.departureTime).utc().format("H[hrs] m[min]")}</span>
          <span>{formatPrice(journeyPrice[journey.id].price)}</span>
        </div>
        {journey.id === this.state[selected] ? <JourneyDetails journey={journey} /> : ""}
      </li>
    );
  }

  public onSelect(journeyId: string, stateField: keyof JourneyPlanResultsState) {
    return () => this.setState({ [stateField]: journeyId } as Pick<JourneyPlanResultsState, keyof JourneyPlanResultsState>);
  }

}

function formatPrice(price: number) {
  const pounds = "£" + Math.floor(price / 100);
  const pence = price % 100;
  const spacer = (pence) < 10 ? ".0" : ".";

  return pounds + spacer + pence;
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