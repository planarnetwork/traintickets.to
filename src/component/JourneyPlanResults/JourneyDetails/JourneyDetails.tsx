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
        <div className="row">
          <div className="col-18">
            <ol className="leg-list">
              {this.props.journey.legs.map(this.renderLeg)}
            </ol>
          </div>
        </div>
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
          <div className="col-6">
            <time className="leg-list--time">{moment.unix(leg.callingPoints[0].depart!).utc().format(moment.HTML5_FMT.TIME)}</time>
          </div>
          <div className="col-18">
            <p className="leg-list--station">{locationByCode[leg.origin].name}</p>
          </div>
        </div>
        <div className="row leg-list--line">
          <div className="offset-6 col-18">
            <p className="leg-list--duration">
              {operators[leg.operator]} service ({leg.service})
              {leg.callingPoints.length > 2 && (
                <button className="leg-list--btn-calling" onClick={this.onSelect} data-index={index}>
                  <span className="sr-only">show calling points</span>
                  {this.state.selected === index ? "-" : "+"}
                </button>
              )}
            </p>
          </div>
        </div>
        {this.state.selected === index ? this.renderCallingPoints(leg.callingPoints) : ""}
        <div className="row">
          <div className="col-6">
            <time className="leg-list--time">
              {moment.unix(leg.callingPoints[leg.callingPoints.length - 1].arrive!).utc().format(moment.HTML5_FMT.TIME)}
            </time>
          </div>
          <div className="col-18">
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
                <div className="col-6">
                  <time className="calling-list--time">{moment.unix(p.arrive).utc().format(moment.HTML5_FMT.TIME)}</time>
                </div>
                <div className="col-18">
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
          <div className="col-18 offset-6">
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
