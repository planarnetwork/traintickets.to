import * as React from "react";
import {Journey} from "../../../../service/JourneyPlanner/JourneyPlanner";
import {JourneyPriceIndex} from "../JourneyPlanResults";
const Chart = require("react-google-charts").Chart;


export class FareGraph extends React.Component<FareGraphProps> {

  public render() {
    const journeys = this.props.journeys.map(journey => {
      return [
        new Date(journey.departureTime * 1000),
        this.props.fares[journey.id].price / 100
      ]
    });

    return (
      <Chart
        chartType="LineChart"
        data={[["time", "price"]].concat(journeys as any)}
        options={{
          hAxis: { gridlines: { count: 9 }, minValue: new Date(4 * 3600 * 1000) },
          vAxis: { gridlines: { count: 2 }, textPosition: "none", minValue: 0 },
          legend: "none",
          // curveType: "function",
          backgroundColor: { stroke: "none" },
          chartArea: { top: 10, height: "80%", left: 20, width: "94%" }
        }}
        graph_id={"PriceChart" + this.props.journeys[0].id}
        width={"100%"}
        height={"150px"}
      />
    );
  }
}

export interface FareGraphProps {
  journeys: Journey[],
  fares: JourneyPriceIndex;
}