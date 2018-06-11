import * as React from 'react';
import {
  Journey,
  SearchResults,
} from "../../service/JourneyPlanner/JourneyPlanner";
import * as moment from "moment";
import autobind from "autobind-decorator";
import "./JourneyPlanResults.css";
import {JourneyDetails} from "./JourneyDetails/JourneyDetails";
import {Price} from "./../Price/Price";
import {locationByCode} from "../../config/locations";

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
    return <div className="fares--results col-sm-24 center">Add some search criteria to see results</div>;
  }

  public renderJourneys(className: string, journeys: Journey[], journeyPrice: JourneyPriceIndex, selected: keyof JourneyPlanResultsState) {
    const [title, from, to] = selected === "outwardSelected"
      ? ["Going out", this.props.query.origin, this.props.query.destination]
      : ["Coming back", this.props.query.destination, this.props.query.origin];

    return (
      <div className={className}>
        <h3 className="fares--title bold">{ `${title} - ${locationByCode[from].name} to ${locationByCode[to].name}` }</h3>
        {/*<FareGraph journeys={journeys} fares={journeyPrice}/>*/}
        <ol className="fare-list clearfix">
          { journeys.map(j => this.renderJourney(j, journeyPrice, selected)) }
        </ol>
      </div>
    )
  }

  public renderJourney(journey: Journey, journeyPrice: JourneyPriceIndex, selected: keyof JourneyPlanResultsState) {
    return (
      <li onClick={this.onSelect(journey.id, selected)} key={journey.id} className={journey.id === this.state[selected] ? "fare-list--item is-selected" : "fare-list--item"}>
        <div className="row">
          <div className="col-10">
            <time className="fare-list--time">
              {moment.unix(journey.departureTime).utc().format(moment.HTML5_FMT.TIME)}
            </time>&nbsp;-&nbsp;
            <time className="fare-list--time">
              {moment.unix(journey.arrivalTime).utc().format(moment.HTML5_FMT.TIME)}
            </time>
            <time className="fare-list--duration">
              {moment.unix(journey.arrivalTime - journey.departureTime).utc().format("H[hrs] m[min]")}
            </time>
          </div>
          <div className="col-10">
            <span className="fare-list--station">{locationByCode[journey.origin].name}</span>&nbsp;-&nbsp;
            <span className="fare-list--station">{locationByCode[journey.destination].name}</span>
          </div>
          <div className="col-4">
            <Price value={journeyPrice[journey.id].price} />
          </div>
        </div>
        {journey.id === this.state[selected] && <JourneyDetails journey={journey} />}
      </li>
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

export interface JourneyPriceIndex {
  [journeyId: string]: {
    price: number;
  }
}