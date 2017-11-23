import React, {Component} from "react";
import locations from '../../data/locations.json';
import ScrollArea from 'react-scrollbar';
import './FullFares.css';

class FullFares extends Component {

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
            <div className="map-container">
                <div className="map-info">
                    <div className="top-block">
                        <a className="block-close" href="" onClick={(event) => this.props.handleFullFaresModal(event)}><i className="fa fa-times-circle" aria-hidden="true"></i></a>
                        <div className="block-element">
                            <h3>Origin</h3>
                            <span>{this.props.origin}</span>
                        </div>
                        <div className="block-element">
                            <h3>Destination</h3>
                            <span>{this.props.destination}</span>
                        </div>
                        <div className="block-element">
                            <h3>{this.props.adults + this.props.children > 1 ? 'Passengers' : 'Passenger'}</h3>
                            <span>{this.props.adults + this.props.children}</span>
                        </div>
                        <div className="block-element">
                            <h3>Ticket</h3>
                            <span>Ticket Type</span>
                        </div>
                        <div className="block-element">
                            <h3>Price</h3>
                            <p><span className="pound">&#163;</span>{Math.floor(this.props.fullFaresPrice / 100)}<span className="pence">.{(this.props.fullFaresPrice % 100) === 0 ? (this.props.fullFaresPrice % 100) + '0' : (this.props.fullFaresPrice % 100)}</span></p>
                        </div>
                    </div>
                    <div className="bottom-block">

                        {this.props.routeFull.map((key, ind) => (
                            <ScrollArea
                                speed={0.8}
                                className="area"
                                contentClassName="content leg-list"
                                horizontal={true}
                                key={ind}
                            >
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
                                        data = (
                                            <p className="point-element">
                                                Transfer to {legDis.name} ({leg.destination}), {leg.duration} min
                                            </p>
                                        )
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
                                                <span className="ff-mode">
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
                            </ScrollArea>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default FullFares;
