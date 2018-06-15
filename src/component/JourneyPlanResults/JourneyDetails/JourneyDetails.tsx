import autobind from "autobind-decorator";
import {CallingPoint, FixedLeg, Journey, Leg, TimetableLeg} from "../../../service/JourneyPlanner/JourneyPlanner";
import * as React from "react";
import * as moment from "moment";
import {locationByCode} from "../../../config/locations";
import "./Leg.css";
import "./CallingPoint.css";
import {operators} from "../../../config/operators";

@autobind
export class JourneyDetails extends React.Component<JourneyDetailsProps, JourneyDetailsState> {

  public state = {
    selected: -1
  };

  public onSelect(event: React.MouseEvent<HTMLButtonElement>) {
    const index = event.currentTarget.getAttribute("data-index");

    if (index) {
      const intIndex = parseInt(index, 10);

      this.setState({ selected: intIndex === this.state.selected ? -1 : intIndex });
    }

    event.stopPropagation();
  }

  public render() {
    return (
      <div className="leg-container">
        <ol className="leg-list">
          {this.props.journey.legs.map(this.renderLeg)}
        </ol>
      </div>
    );
  }
  private renderLeg(leg: Leg, index: number) {
    return leg.type === "timetable" ? this.renderTimetableLeg(leg, index) : this.renderFixedLeg(leg, index);
  }

  private renderTimetableLeg(leg: TimetableLeg, index: number) {
    return (
      <li key={index} className={'leg-mode leg-mode__' + leg.mode}>
        {/*<span>{leg.mode}</span>*/}
        <div className="row">
          <div className="col-5">
            <time className="leg-list--time">{moment.unix(leg.callingPoints[0].depart!).utc().format(moment.HTML5_FMT.TIME)}</time>
          </div>
          <div className="col-19">
            <p className="leg-list--station">{locationByCode[leg.origin].name}</p>
          </div>
        </div>
        <div className="row leg-list--line">
          <div className="offset-5 col-19">
            <p className="leg-list--duration">
              {leg.callingPoints.length > 2 ? (
                <button title={leg.service} className={this.state.selected === index ? "leg-list--btn-calling is-active" : "leg-list--btn-calling"} onClick={this.onSelect} data-index={index}>
                  <span className="sr-only">show calling points</span>
                  {operators[leg.operator]} service
                </button>
                )
              : (
                <span title={leg.service}>{operators[leg.operator]} service</span>
                )
              }
            </p>
          </div>
        </div>
        {this.state.selected === index ? this.renderCallingPoints(leg.callingPoints) : ""}
        <div className="row">
          <div className="col-5">
            <time className="leg-list--time">
              {moment.unix(leg.callingPoints[leg.callingPoints.length - 1].arrive!).utc().format(moment.HTML5_FMT.TIME)}
            </time>
          </div>
          <div className="col-19">
            <p className="leg-list--station">{locationByCode[leg.destination].name}</p>
          </div>
        </div>
      </li>
    );
  }

  private renderCallingPoints(points: CallingPoint[]) {
    return (
      <ol className="calling-list">
        {points.slice(1, -1).map((p, i) => (
          p.arrive && (
            <li key={i} className="calling-list--item">
              <div className="row">
                <div className="col-5">
                  <time className="calling-list--time">{moment.unix(p.arrive).utc().format(moment.HTML5_FMT.TIME)}</time>
                </div>
                <div className="col-19">
                  <p className="calling-list--station">{locationByCode[p.station].name}</p>
                </div>
              </div>
            </li>
          )
        ))}
      </ol>
    );
  }

  private renderFixedLeg(leg: FixedLeg, index: number) {
    const durationFormat = leg.duration < 3600 ? "m[min]" : "H[hrs] m[min]";

    return (
      <li key={index} className={'leg-fixed leg-mode leg-mode__' + leg.mode}>
        <div className="row leg-list--line">
          <div className="col-19 offset-5 col-sm-21 offset-sm-3 col-md-19 offset-md-5 col-lg-20 offset-lg-4 col-xl-21 offset-xl-3">
            <p className="leg-list--station">
              <span className="capital">{leg.mode}</span> from {locationByCode[leg.origin].name} to {locationByCode[leg.destination].name}
            </p>
            {/*<p className="leg-list--station">{locationByCode[leg.origin].name}</p>*/}
            <p className="leg-list--duration leg-list--duration">{moment.unix(leg.duration).utc().format(durationFormat)}</p>
            {/*<p className="leg-list--station">{locationByCode[leg.destination].name}</p>*/}
          </div>
        </div>
      </li>
    );
  }
}

export interface JourneyDetailsProps {
  journey: Journey;
}

export interface JourneyDetailsState {
  selected: number;
}
