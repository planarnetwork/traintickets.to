import * as React from 'react';
import {Journey, SearchResults, ReturnJourneyFareMap, JourneyFareMap} from "../../service/JourneyPlanner/JourneyPlanner";
import * as moment from "moment";
import autobind from "autobind-decorator";
import "./JourneyPlanResults.css";
import {JourneyDetails} from "./JourneyDetails/JourneyDetails";
import {Price} from "./../Price/Price";
import {getLocation} from "../../config/locations";
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import {SelectedOptions} from "../../page/Index/IndexPage";


@autobind
export class JourneyPlanResults extends React.Component<JourneyPlanResultsProps, JourneyPlanResultsState> {

  private lastSelected = "";

  public state = {
    outward: {
      selected: "",
      open: ""
    },
    inward: {
      selected: "",
      open: ""
    }
  };

  public static getDerivedStateFromProps(props: SearchResults, state: JourneyPlanResultsState) {
    const outwardValid = props.response.prices[state.outward.selected];
    const outwardSelected = outwardValid ? state.outward.selected : props.response.cheapestOutward;
    const outwardFares = props.response.prices[outwardSelected] as any;
    const inwardValid = outwardFares && outwardFares.with && outwardFares.with[state.inward.selected];
    const inwardSelected = inwardValid ? state.inward.selected : props.response.cheapestInward;

    return {
      outward: {
        selected: outwardSelected,
        open: state.outward.open,
      },
      inward: {
        selected: inwardSelected,
        open: state.inward.open
      }
    };
  }

  public componentDidUpdate(prevProps: JourneyPlanResultsProps, prevState: JourneyPlanResultsState) {
    if (this.props.response.outward.length === 0) {
      return;
    }

    if (this.props.response.cheapestOutward !== prevProps.response.cheapestOutward) {
      this.scroll("outward");
    }

    if (this.props.response.cheapestInward !== prevProps.response.cheapestInward) {
      this.scroll("inward");
    }

    const selected = this.props.response.inward.length === 0
      ? (this.props.response.fares as JourneyFareMap)[this.state.outward.selected]
      : (this.props.response.fares as ReturnJourneyFareMap)[this.state.outward.selected][this.state.inward.selected];

    if (this.lastSelected !== selected.join()) {
      this.lastSelected = selected.join();

      this.props.onSelectionChange({
        outward: this.state.outward.selected,
        inward: this.props.response.inward.length > 0 ? this.state.inward.selected : undefined,
        fareOptions: selected
      });
    }
  }

  private scroll(direction: keyof JourneyPlanResultsState) {
    const el = document.querySelector(`.fares-${direction} .is-selected`);

    if (el) {
      scrollIntoViewIfNeeded(el, { behavior: "instant", scrollMode: "if-needed" });
    }
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
    const inwardJourneyFares = this.props.response.prices[this.state.outward.selected] as any;

    return (
      <React.Fragment>
        { this.renderJourneys(this.props.response.outward, this.props.response.prices, "outward") }
        { !isReturn && this.renderEmptyReturn()}
        { isReturn && this.renderJourneys(this.props.response.inward, inwardJourneyFares.with, "inward") }
      </React.Fragment>
    )
  }

  public renderEmptyReturn() {
    return (
      <div id="inward" className="col-md-12">
        <h2 className="fares--direction fares--direction__none bold">No return selected</h2>
        <div className={this.props.lessHeight ? "fares--empty-return fares--empty-return__short center" : "fares--empty-return center"}>
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
      <div id={direction} className="col-md-12">
        <h2 className={'fares--direction bold fares--direction__' + direction}>{<span className="d-none d-sm-inline"> {title} - </span>}{`${getLocation(from).name} to ${getLocation(to).name}` }</h2>
        {/*<FareGraph journeys={journeys} fares={journeyPrice}/>*/}
        <ol className={this.props.lessHeight ? "fare-list fare-list__short clearfix fares-" + direction : "fare-list clearfix fares-" + direction}>
          { journeys.map(j => this.renderJourney(j, journeyPrice, direction)) }
        </ol>
      </div>
    )
  }

  public renderJourney(journey: Journey, journeyPrice: JourneyPriceIndex, direction: keyof JourneyPlanResultsState) {
    const duration = journey.arrivalTime - journey.departureTime;
    const durationFormat = duration < 3600 ? "m[min. ]" : "H[hrs] m[min. ]";
    const changeDescription = journey.legs.length === 1
      ? "Direct"
      : "Change at " + journey.legs.slice(0, -1).map(l => getLocation(l.destination).name).join(", ");
    const changeText = journey.legs.length === 1
      ? "Direct"
      : (journey.legs.length - 1) + " changes";

    return (
      <li onClick={this.onSelect(journey.id, direction)} key={journey.id} className={journey.id === this.state[direction].selected ? "fare-list--item is-selected" : "fare-list--item"}>
        <div className="fare-list--item-container">
          <div className="row">
            <div className="col-18">
              <div className="row">
                <div className="col-5">
                  <time className="fare-list--time">
                    {moment.unix(journey.departureTime).utc().format(moment.HTML5_FMT.TIME)}
                  </time>
                </div>
                <div className="col-19"> 
                  <p className="fare-list--station">{getLocation(journey.origin).name}</p>
                </div>
              </div>
              <div className="row fare-list--line">
                <div className="offset-5 col-19">
                  <button title={changeDescription} type="button" className={journey.id === this.state[direction].open ? "fare-list--btn-legs is-active" : "fare-list--btn-legs"} onClick={this.onOpen(journey.id, direction)}>
                    {moment.unix(duration).utc().format(durationFormat)}
                    {changeText}
                    <span className="sr-only">show more journey information</span>
                  </button>
                  {journey.id === this.state[direction].open && <JourneyDetails journey={journey} />}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <time className="fare-list--time">
                    {moment.unix(journey.arrivalTime).utc().format(moment.HTML5_FMT.TIME)}
                  </time>
                </div>
                <div className="col-19">
                  <p className="fare-list--station">
                  {getLocation(journey.destination).name}&nbsp;
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 text-right">
              <Price direction={direction} value={journeyPrice[journey.id].price} />
            </div>
          </div>
        </div>
      </li>
    );
  }

  public onSelect(journeyId: string, direction: keyof JourneyPlanResultsState) {
    return () => this.setState({
      [direction]: {
        selected: journeyId,
        open: this.state[direction].open
      }
    } as any);
  }

  public onOpen(journeyId: string, direction: keyof JourneyPlanResultsState) {
    return (event: React.FormEvent<HTMLButtonElement>) => {
      this.setState({
        [direction]: {
          selected: this.state[direction].selected,
          open: this.state[direction].open === journeyId ? "" : journeyId
        }
      } as any);

      event.stopPropagation();
    }
  }

}

interface JourneyPlanResultsProps extends SearchResults {
  lessHeight: boolean;
  onSelectionChange: (selected: SelectedOptions) => any;
}

interface JourneyPlanResultsState {
  outward: {
    selected: string;
    open: string;
  };
  inward: {
    selected: string;
    open: string;
  };
}

export interface JourneyPriceIndex {
  [journeyId: string]: {
    price: number;
  }
}