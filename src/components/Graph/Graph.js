import React, {Component} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import './Graph.css';

class Graph extends Component {

    render() {
        const data = [
            {name: '05:00', a: 15.30, b: 17.20},
            {name: '06:00', a: 15.30, b: 13.70},
            {name: '07:00', a: 15.30, b: 13.20},
            {name: '08:00', a: 15.30, b: 13.20},
            {name: '09:00', a: 15.30, b: 13.20},
            {name: '10:00', a: 15.30, b: 19.40},
            {name: '11:00', a: 25.47, b: 19.40},
            {name: '12:00', a: 25.47, b: 19.40},
            {name: '13:00', a: 25.47, b: 19.40},
            {name: '14:00', a: 24.20, b: 19.40},
            {name: '15:00', a: 24.20, b: 19.40},
            {name: '16:00', a: 24.20, b: 19.40},
            {name: '17:00', a: 24.20, b: 19.40},
            {name: '18:00', a: 14.10, b: 19.40},
            {name: '19:00', a: 14.10, b: 24.50},
            {name: '20:00', a: 14.10, b: 24.50},
            {name: '21:00', a: 19.28, b: 24.50},
            {name: '22:00', a: 19.28, b: 11.30},
            {name: '23:00', a: 19.28, b: 11.30},
            {name: '00:00', a: 19.28, b: 11.30},
        ];

        return (
            <section className="graph">
                <LineChart width={1366} height={225} data={data}>
                    <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                    <YAxis unit=" £"/>
                    <CartesianGrid strokeDasharray="15 0" horizontal={false} />
                    <Tooltip/>
                    <Line type="natural" dataKey="a" stroke="#8884d8" connectNulls={true} />
                    <Line type="natural" dataKey="b" stroke="#82ca9d" connectNulls={true} />
                </LineChart>
            </section>
        );
    }
}

export default Graph;
