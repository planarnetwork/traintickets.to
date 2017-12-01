import React, {Component} from "react";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import './Graph.css';

class Graph extends Component {

    render() {
        const outwardJourneys = this.props.journeys.outward
          .map(journey => {
            const [hours, minutes] = journey.departureTime.split(":");

            return {
              x: parseInt(hours * 60, 10) + parseInt(minutes, 10),
              y: this.props.fares[journey.id].price / 100
            }
          });


        console.log(outwardJourneys);
        return (
            <section className="graph">
                <ScatterChart width={1366} height={225}>
                    <XAxis range={[0, 1440]} dataKey="x" padding={{left: 30, right: 30}}/>
                    <YAxis dataKey="y" unit="£"/>
                    <CartesianGrid strokeDasharray="15 0" horizontal={false} />
                    <Tooltip/>
                    <Scatter line data={outwardJourneys} fill="#8884d8" />

                </ScatterChart>
            </section>
        );
    }
}

export default Graph;
