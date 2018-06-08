import autobind from "autobind-decorator";
import {CallingPoint, FixedLeg, Journey, Leg, TimetableLeg} from "../../../service/JourneyPlanner/JourneyPlanner";
import * as React from "react";
import * as moment from "moment";

@autobind
export class JourneyDetails extends React.Component<JourneyDetailsProps, JourneyDetailsState> {

  public state = {
    selected: -1
  };

  public onSelect(event: React.MouseEvent<HTMLDivElement>) {
    const index = event.currentTarget.getAttribute("data-index");

    if (index) {
      const intIndex = parseInt(index, 10);

      this.setState({ selected: intIndex === this.state.selected ? -1 : intIndex });
    }

    event.stopPropagation();
  }

  public render() {
    return (
      <div>
        {this.props.journey.legs.map(this.renderLeg)}
      </div>
    );
  }
  private renderLeg(leg: Leg, index: number) {
    return leg.type === "timetable" ? this.renderTimetableLeg(leg, index) : this.renderFixedLeg(leg, index);
  }

  private renderTimetableLeg(leg: TimetableLeg, index: number) {
    return (
      <div onClick={this.onSelect} data-index={index} key={index}>
        <span>{leg.mode}</span>
        <span>{leg.origin}</span>
        <span>{leg.destination}</span>
        <span>{leg.service}</span>
        <span>{leg.operator}</span>
        <span>{moment.unix(leg.callingPoints[0].depart!).utc().format(moment.HTML5_FMT.TIME)}</span>
        <span>{moment.unix(leg.callingPoints[leg.callingPoints.length - 1].arrive!).utc().format(moment.HTML5_FMT.TIME)}</span>
        {this.state.selected === index ? this.renderCallingPoints(leg.callingPoints) : ""}
      </div>
    );
  }

  private renderCallingPoints(points: CallingPoint[]) {
    return (
      <ol><li>derp</li></ol>
    );
  }

  private renderFixedLeg(leg: FixedLeg, index: number) {
    return (
      <div key={index}>
        <span>{leg.mode}</span>
        <span>{leg.origin}</span>
        <span>{leg.destination}</span>
        <span>{leg.duration}</span>
      </div>
    );
  }
}

export interface JourneyDetailsProps {
  journey: Journey;
}

export interface JourneyDetailsState {
  selected: number;
}
