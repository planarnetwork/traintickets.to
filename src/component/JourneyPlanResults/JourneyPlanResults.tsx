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
    outward: {
      selected: "",
      open: false
    },
    inward: {
      selected: "",
      open: false
    }
  };

  public static getDerivedStateFromProps(props: SearchResults, state: JourneyPlanResultsState) {
    const outwardValid = props.response.fares[state.outward.selected];
    const outwardSelected = outwardValid ? state.outward.selected : props.response.cheapestOutward;
    const outwardFares = props.response.fares[outwardSelected] as any;
    const inwardValid = outwardFares && outwardFares.with && outwardFares.with[state.inward.selected];
    const inwardSelected = inwardValid ? state.inward.selected : props.response.cheapestInward;

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
    const inwardJourneyFares = this.props.response.fares[this.state.outward.selected] as any;

    return (
      <React.Fragment>
        { this.renderJourneys(this.props.response.outward, this.props.response.fares, "outward") }
        { !isReturn && this.renderEmptyReturn()}
        { isReturn && this.renderJourneys(this.props.response.inward, inwardJourneyFares.with, "inward") }
      </React.Fragment>
    )
  }

  public renderEmptyReturn() {
    return (
      <div className="col-md-12">
        <h3 className="fares--direction bold">No return selected</h3>
        <div className="fares--empty-return center">
          <p className="fares--empty-title">No return journey selected</p>
        </div>
      </div>
    );
  }

  public renderNoResults() {
    return (
      <div className="col-sm-24 center">
        <p className="fares--empty-title">Add some search criteria to see results</p>
      </div>
    );
  }

  public renderJourneys(journeys: Journey[], journeyPrice: JourneyPriceIndex, direction: keyof JourneyPlanResultsState) {
    const [title, from, to] = direction === "outward"
      ? ["Going out", this.props.query.origin, this.props.query.destination]
      : ["Coming back", this.props.query.destination, this.props.query.origin];

    return (
      <div className="col-md-12">
        <h3 className="fares--direction bold">{ `${title} - ${locationByCode[from].name} to ${locationByCode[to].name}` }</h3>
        {/*<FareGraph journeys={journeys} fares={journeyPrice}/>*/}
        <ol className="fare-list clearfix">
          { journeys.map(j => this.renderJourney(j, journeyPrice, direction)) }
        </ol>
      </div>
    )
  }

  public renderJourney(journey: Journey, journeyPrice: JourneyPriceIndex, direction: keyof JourneyPlanResultsState) {
    return (
      <li onClick={this.onSelect(journey.id, direction)} key={journey.id} className={journey.id === this.state[direction].selected ? "fare-list--item is-selected" : "fare-list--item"}>
        <div className="row">
          <div className="col-5">
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
          <div className="col-15">
            <p className="fare-list--station">{locationByCode[journey.origin].name} to </p>
            <p className="fare-list--station">{locationByCode[journey.destination].name}</p>
          </div>
          <div className="col-4">
            <Price value={journeyPrice[journey.id].price} />
            <button type="button" onClick={this.onOpen(journey.id, direction)}>{
              journey.id === this.state[direction].selected && this.state[direction].open ? "Less" : "More"
            }</button>
          </div>
          <div className="col"> {
            journey.legs.length === 1 ? "Direct" :
            journey.legs.length < 4 ? "Change at " + journey.legs.slice(0, -1).map(l => locationByCode[l.destination].name).join(", ") :
            journey.legs.length + " changes"
          }</div>
        </div>
        {journey.id === this.state[direction].selected && this.state[direction].open && <JourneyDetails journey={journey} />}
      </li>
    );
  }

  public onSelect(journeyId: string, direction: keyof JourneyPlanResultsState) {
    return () => this.setState({
      [direction]: {
        selected: journeyId,
        open: false
      }
    } as any);
  }

  public onOpen(journeyId: string, direction: keyof JourneyPlanResultsState) {
    return (event: React.FormEvent<HTMLButtonElement>) => {
      this.setState({
        [direction]: {
          selected: journeyId,
          open: !this.state[direction].open
        }
      } as any);

      event.stopPropagation();
    }
  }

}

interface JourneyPlanResultsState {
  outward: {
    selected: string;
    open: boolean;
  };
  inward: {
    selected: string;
    open: boolean;
  };
}

export interface JourneyPriceIndex {
  [journeyId: string]: {
    price: number;
  }
}