import React, {Component} from "react";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import './Graph.css';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const data = [
            {name: '05:00', Funt: 15.30},
            {name: '06:00', Funt: 15.30},
            {name: '07:00', Funt: 15.30},
            {name: '08:00', Funt: 15.30},
            {name: '09:00', Funt: 15.30},
            {name: '10:00', Funt: 15.30},
            {name: '11:00', Funt: 25.47},
            {name: '12:00', Funt: 25.47},
            {name: '13:00', Funt: 25.47},
            {name: '14:00', Funt: 24.20},
            {name: '15:00', Funt: 24.20},
            {name: '16:00', Funt: 24.20},
            {name: '17:00', Funt: 24.20},
            {name: '18:00', Funt: 14.10},
            {name: '19:00', Funt: 14.10},
            {name: '20:00', Funt: 14.10},
            {name: '21:00', Funt: 19.28},
            {name: '22:00', Funt: 19.28},
            {name: '23:00', Funt: 19.28},
            {name: '00:00', Funt: 19.28},
        ];

        return (
            <section className="graph">
                <h4 className="h-title">Fares Graph</h4>
                <AreaChart label={{ fill: 'red', fontSize: 20 }} width={1366} height={325} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                    <XAxis dataKey="name" padding={{ left: 25 }} />
                    <YAxis unit=' Funt' dataKey={"Funt"} />
                    <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                    <Tooltip/>
                    <Area type='stepAfter' dot={{ stroke: '#5a8fd5', strokeWidth: 2 }} stackId="1" dataKey='Funt' stroke='#5a8fd5' fill='#5a8fd5' fillOpacity={0.7}/>
                </AreaChart>
            </section>
        );
    }
}

export default Graph;
