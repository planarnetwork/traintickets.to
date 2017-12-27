import React, {Component} from "react";
import './Graph.css';
import { Chart } from 'react-google-charts';

class Graph extends Component {

    render() {
        const outwardJourneys = this.props.journeys.outward.map(journey => {
            return [
                new Date(journey.departureTime * 1000),
                this.props.fares[journey.id].price / 100
            ]
        });

        return (
            <section className="graph">
                <Chart
                    chartType="LineChart"
                    data={[['time', 'price']].concat(outwardJourneys)}
                    options={{
                        hAxis: {  },
                        vAxis: { format: '£##.##', minValue: 0 },
                        legend: 'none',
                        curveType: 'function',
                        chartArea: { top: 10, height: "80%", left: 50, width: "93%" }
                    }}
                    graph_id="PriceChart"
                    width={"1366px"}
                    height={"225px"}
                />
            </section>
        );
    }
}

export default Graph;
