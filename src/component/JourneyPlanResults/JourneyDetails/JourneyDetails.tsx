import autobind from "autobind-decorator";
import {CallingPoint, FixedLeg, Journey, Leg, TimetableLeg} from "../../../service/JourneyPlanner/JourneyPlanner";
import * as React from "react";
import * as moment from "moment";
import {locationByCode} from "../../../config/locations";

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
      <ol className="leg-list">
        {this.props.journey.legs.map(this.renderLeg)}
      </ol>
    );
  }
  private renderLeg(leg: Leg, index: number) {
    return leg.type === "timetable" ? this.renderTimetableLeg(leg, index) : this.renderFixedLeg(leg, index);
  }

  private renderTimetableLeg(leg: TimetableLeg, index: number) {
    return (
      <li key={index} className={'leg-mode leg-mode__' + leg.mode}>
        {/*<span>{leg.mode}</span>*/}
        <div className="clearfix">
          <time className="pull-left">{moment.unix(leg.callingPoints[0].depart!).utc().format(moment.HTML5_FMT.TIME)}</time>
          <p className="pull-right">{locationByCode[leg.origin].name}</p>
        </div>
        {/*<span>{leg.service}</span>*/}
        <p>
          {leg.operator} service <button onClick={this.onSelect} data-index={index}>Show calling points</button>
        </p>
        {this.state.selected === index ? this.renderCallingPoints(leg.callingPoints) : ""}
        <div className="clearfix">
          <time className="pull-left">{moment.unix(leg.callingPoints[leg.callingPoints.length - 1].arrive!).utc().format(moment.HTML5_FMT.TIME)}</time>
          <p className="pull-right">{locationByCode[leg.destination].name}</p>
        </div>
      </li>
    );
  }

  private renderCallingPoints(points: CallingPoint[]) {
    return (
      <ol className="calling-list">
        {points.map((p, i) => (
          <li key={i} className="clearfix">
            <p className="pull-right">{locationByCode[p.station].name}</p>
              <p>
                arr {p.arrive ? moment.unix(p.arrive).utc().format(moment.HTML5_FMT.TIME) : "--:--"}
                &nbsp; / &nbsp;
                dep {p.depart ? moment.unix(p.depart).utc().format(moment.HTML5_FMT.TIME) : "--:--"}
              </p>
          </li>
        ))}
      </ol>
    );
  }

  private renderFixedLeg(leg: FixedLeg, index: number) {
    return (
      <li key={index} className={'leg-mode leg-mode__' + leg.mode}>
        {/*<span>{leg.mode}</span>*/}
        <div className="text-right">{locationByCode[leg.origin].name}</div>
        <div>{leg.duration}</div>
        <div className="text-right">{locationByCode[leg.destination].name}</div>
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
