import React, {Component} from "react";
import locations from '../../data/locations.json';

import './Tap.css';

class Tap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points: [{
                0: true
            }],
        };
        this.handlePoint = this.handlePoint.bind(this);
    }

    handlePoint(id) {
        const newPoint = this.state.points.slice();
        newPoint[id] = !this.state.points[id];
        this.setState({
            points: newPoint,
        });
    }

    render() {
        return (
            <div className="tap-modal">
                <div className="tap-list">
                    <a className="tap-close" href="" onClick={(event) => this.props.handleTapModal(event)}><i className="fa fa-times-circle" aria-hidden="true"></i></a>
                    <div className="tap-element">
                        <h2>Origin</h2>
                        <p>{this.props.origin}</p>
                    </div>
                    <div className="tap-element">
                        <h2>Destination</h2>
                        <p>{this.props.destination}</p>
                    </div>
                    <div className="tap-element rout-element">
                        <h2>Route</h2>
                        {this.props.routeTaps.map((key, ind) => (
                            <div key={ind} className="leg-list">
                                {key.legs.map((leg, i) => {
                                    let mode, data;
                                    let legLoc = locations.find((e) => {
                                        return this.props.searchResult.response ? e.code === leg.origin : undefined;
                                    });
                                    let legDis = locations.find((e) => {
                                        return this.props.searchResult.response ? e.code === leg.destination : undefined;
                                    });

                                    if(leg.mode === 'train') {
                                        mode = <i className="material-icons">directions_railway</i>;
                                    } else if(leg.mode === 'transfer' || leg.mode === 'walk') {
                                        mode = <i className="material-icons">directions_walk</i>;
                                        data = (
                                            <p className="point-element">
                                                Transfer to {legDis.name} ({leg.destination}), {leg.duration} min
                                            </p>
                                        )
                                    } else if(leg.mode === 'bus' || leg.mode === 'replacement bus') {
                                        mode = <i className="material-icons">directions_bus</i>;
                                    } else if(leg.mode === 'tram') {
                                        mode = <i className="material-icons">tram</i>;
                                    } else if(leg.mode === 'metro') {
                                        mode = <i className="material-icons">directions_subway</i>;
                                    } else if(leg.mode === 'tube') {
                                        mode = <i className="material-icons">subway</i>;
                                    } else if(leg.mode === 'ferry') {
                                        mode = <i className="material-icons">directions_boat</i>;
                                    } else if(leg.mode === 'cable car') {
                                        mode = <i className="material-icons">local_taxi</i>;
                                    } else {
                                        mode = [];
                                        data = (
                                            <p className="point-element">
                                                Information not found
                                            </p>
                                        )
                                    }
                                    return (
                                        <div key={i} className="leg-element">
                                            <h3>
                                                {legLoc.name} {leg.service ? '(' + leg.service +')' : null}
                                                <span className="tap-mode">
                                                    {mode}
                                                </span>
                                                <i className={this.state.points[i] ? "fa fa-angle-up" : "fa fa-angle-down" } aria-hidden="true" onClick={() => {this.handlePoint(i)}}></i>
                                            </h3>
                                            {this.state.points[i] ? leg.callingPoints ? leg.callingPoints.map((point, index) => {
                                                let pointLoc = locations.find((e) => {
                                                    return this.props.searchResult.response ? e.code === point.station : undefined;
                                                });
                                                return (
                                                    <p key={index} className="point-element">
                                                        <span className="point-time">{point.time}</span>
                                                        <span className="point-station">{pointLoc.name}</span>
                                                    </p>
                                                )
                                            }) : data : []}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="tap-element">
                        <h2>Passenger(s)</h2>
                        <p>{this.props.passenger}</p>
                    </div>
                    <div className="tap-element">
                        <h2>Ticket</h2>
                        <p>Ticket Type</p>
                    </div>
                    <div className="tap-element">
                        <h2>Price</h2>
                        <p><span className="pound">&#163;</span>{Math.floor(this.props.tap / 100)}<span className="pence">.{(this.props.tap % 100)}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tap;
