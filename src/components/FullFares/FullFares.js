import React, {Component} from "react";
import locations from '../../data/locations.json';

import './FullFares.css';
import {IconButton} from 'material-ui';
import Map from '../Map/MapContainer'
import * as moment from "moment";

class FullFares extends Component {

    render() {
        let styles = {
            tooltipStyles: {
                left: '-15px',
                top: '-15px',
            }
        };

        const key = this.props.routeFull;
        return (
            <div className="map-container">
                <Map route={this.props.routeFull} />
                <div className="map-info">
                    <div className="block-close" onClick={(event) => this.props.handleFullFaresModal(event)}><i className="fa fa-times-circle" aria-hidden="true"></i></div>
                        <div className="bottom-block">

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
                                                {leg.mode === 'transfer' ? 'Transfer' : 'Walk'} to {legDis.name} ({leg.destination}), {moment.unix(leg.duration).utc().format("m")} min
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
                                                Tube to {legDis.name} ({leg.destination}), {moment.unix(leg.duration).utc().format("m")} min
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
                                                {legLoc.name} {leg.service ? '(' + leg.operator + ', ' + leg.service +')' : null}
                                                <span className="ff-mode">
                                                    {mode}
                                                </span>
                                            </h3>
                                            {leg.callingPoints ? leg.callingPoints.map((point, index) => {
                                                let pointLoc = locations.find((e) => {
                                                    return this.props.searchResult.response ? e.code === point.station : undefined;
                                                });
                                                return (
                                                    <p key={index} className="point-element">
                                                        <span className="point-time">{point.arrive ? moment.unix(point.arrive).utc().format(moment.HTML5_FMT.TIME) : '––:––'}</span>
                                                        <br/>
                                                        <span className="point-time">{point.depart ? moment.unix(point.depart).utc().format(moment.HTML5_FMT.TIME) : '––:––'}</span>
                                                        <span className="point-station">{pointLoc ? pointLoc.name : point.station}</span>
                                                    </p>
                                                )
                                            }) : data}
                                        </div>
                                    )
                                })}

                    </div>
                </div>
            </div>
        );
    }
}

export default FullFares;
