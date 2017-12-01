import React, {Component} from "react";
import locations from '../../data/locations.json';
import ScrollArea from 'react-scrollbar';
import './FullFares.css';
import {IconButton} from 'material-ui';
import Map from '../Map/MapContainer'

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
        let styles = {
            tooltipStyles: {
                left: '-40px',
                top: '-15px',
            }
        };
        return (
            <div className="map-container">
                <Map route={this.props.routeFull} />
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
                                { // This needs to be cleaned up.
                                  key.legs.map((leg, i) => {
                                    let mode, data;
                                    let legLoc = locations.find((e) => {
                                        return this.props.searchResult.response ? e.code === leg.origin : undefined;
                                    });
                                    let legDis = locations.find((e) => {
                                        return this.props.searchResult.response ? e.code === leg.destination : undefined;
                                    });

                                    if(leg.mode === 'train') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip="Train">
                                                <i className="material-icons">directions_railway</i>
                                            </IconButton>
                                        )
                                    } else if(leg.mode === 'transfer' || leg.mode === 'walk') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip={leg.mode === 'transfer' ? 'Transfer' : 'Walk'}>
                                                <i className="material-icons">directions_walk</i>
                                            </IconButton>
                                        );
                                        data = (
                                            <p className="point-element">
                                                Transfer to {legDis.name} ({leg.destination}), {leg.duration} min
                                            </p>
                                        )
                                    } else if(leg.mode === 'bus' || leg.mode === 'replacement bus') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip={leg.mode === 'bus' ? 'Bus' : 'Replacement bus'}>
                                                <i className="material-icons">directions_bus</i>
                                            </IconButton>
                                        )
                                    } else if(leg.mode === 'tram') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip="Tram">
                                                <i className="material-icons">tram</i>
                                            </IconButton>
                                        )
                                    } else if(leg.mode === 'metro') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip="Metro">
                                                <i className="material-icons">directions_subway</i>
                                            </IconButton>
                                        )
                                    } else if(leg.mode === 'tube') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip="Tube">
                                                <i className="material-icons">subway</i>
                                            </IconButton>
                                        );
                                        data = (
                                            <p className="point-element">
                                                Transfer to {legDis.name} ({leg.destination}), {leg.duration} min
                                            </p>
                                        )
                                    } else if(leg.mode === 'ferry') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip="Ferry">
                                                <i className="material-icons">directions_boat</i>
                                            </IconButton>
                                        )
                                    } else if(leg.mode === 'cable car') {
                                        mode = (
                                            <IconButton tooltipStyles={styles.tooltipStyles} tooltip="Cable car">
                                                <i className="material-icons">local_taxi</i>
                                            </IconButton>
                                        )
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
