import React, {Component} from "react";
import {Paper} from 'material-ui';
import OwlCarousel from 'react-owl-carousel2';
import locations from '../../data/locations.json';

import './Fares.css';

class Fares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            outbound: 0,
            return: 0,
        };

    }


    render() {
        let tap = this.state.outbound + this.state.return;
        const options = {
            items: 8,
            nav: true,
            rewind: false,
            autoplay: false,
            autoWidth: false,
            margin: 20,
            mouseDrag: false,
            navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>']
        };
        let originFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.inward.map((key) => key.origin)[0] : undefined;
        });
        let destinationFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.inward.map((key) => key.destination)[0] : undefined;
        });
        let origin = originFound ? originFound.name : undefined;
        let destination = destinationFound ? destinationFound.name : undefined;



        return (
            <section className="fares">
                {this.props.searchResult.response.inward || this.props.searchResult.response.outward ? (
                <div className="container">
                    <div className="fares-out">
                        <h3 className="fares-title bold">{origin ? 'OUTBOUND - ' + origin : ''}{destination ? ' to ' + destination : ''}</h3>
                        <ul className="fare-list clearfix">
                            <OwlCarousel ref="fares-out" options={options}>
                                {this.props.searchResult.response.inward.map((key, ind) => {
                                    let firstDate = key.departureTime;
                                    let secondDate = key.arrivalTime;
                                    let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
                                    let different = (getDate(secondDate) - getDate(firstDate));
                                    let differentRes, hours, minuts;
                                    if(different > 0) {
                                        differentRes = different;
                                        hours = Math.floor((differentRes % 86400000) / 3600000);
                                        minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
                                    } else {
                                        differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
                                        hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
                                        minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
                                    }
                                    let result = hours + ':' + minuts;
                                    return (
                                        <Paper key={ind} className="fare pull-left" zDepth={2}>
                                            <label className="fare-input center">
                                                <div className="fare-stations bold clearfix">
                                                    <span className="fare-station pull-left">{key.origin}</span>
                                                    <span className="fare-station pull-right">{key.destination}</span>
                                                </div>
                                                <div className="fare-times bold clearfix">
                                                    <time className="fare-time pull-left">{key.departureTime}</time>
                                                    <time className="fare-time pull-right">{key.arrivalTime}</time>
                                                </div>
                                                <p className="duration">{result} min</p>
                                                <p className="fare-ticket">Anytime Day Single with Child Flat Fare Single</p>
                                                <div className="fare-bottom">
                                                    <p className="fare-price bold">
                                                        <span className="pound">&#163;</span>15<span className="pence">.20</span>
                                                    </p>
                                                    <input type="radio" className="radio" name="out" onClick={() => this.setState({outbound: 15.2})} />
                                                    <span className="radio-custom"></span>
                                                </div>
                                            </label>
                                        </Paper>
                                    )
                                })}
                            </OwlCarousel>
                        </ul>
                    </div>
                    <div className="fares-return">
                        <h3 className="fares-title bold">{destination ? 'RETURN - ' + destination : ''}{origin ? ' to ' + origin: ''}</h3>
                        <ul className="fare-list clearfix">
                            <OwlCarousel ref="fares-out" options={options} >
                                {this.props.searchResult.response.outward.map((key, ind) => {
                                    let firstDate = key.departureTime;
                                    let secondDate = key.arrivalTime;
                                    let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
                                    let different = (getDate(secondDate) - getDate(firstDate));
                                    let differentRes, hours, minuts;
                                    if(different > 0) {
                                        differentRes = different;
                                        hours = Math.floor((differentRes % 86400000) / 3600000);
                                        minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
                                    } else {
                                        differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
                                        hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
                                        minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
                                    }
                                    let result = hours + ':' + minuts;
                                    return (
                                        <Paper key={ind} className="fare pull-left" zDepth={2}>
                                            <label className="fare-input center">
                                                <div className="fare-stations bold clearfix">
                                                    <span className="fare-station pull-left">{key.origin}</span>
                                                    <span className="fare-station pull-right">{key.destination}</span>
                                                </div>
                                                <div className="fare-times bold clearfix">
                                                    <time className="fare-time pull-left">{key.departureTime}</time>
                                                    <time className="fare-time pull-right">{key.arrivalTime}</time>
                                                </div>
                                                <p className="duration">{result} min</p>
                                                <p className="fare-ticket">Anytime Day Single with Child Flat Fare Single</p>
                                                <div className="fare-bottom">
                                                    <p className="fare-price bold">
                                                        <span className="pound">&#163;</span>36<span className="pence">.99</span>
                                                    </p>
                                                    <input type="radio" className="radio" name="return" onClick={() => this.setState({return: 36.99})} />
                                                    <span className="radio-custom"></span>
                                                </div>
                                            </label>
                                        </Paper>
                                    )
                                })}
                            </OwlCarousel>
                        </ul>
                    </div>
                </div>
                ) : []}
                {this.state.outbound > 0 || this.state.return > 0 ? (
                    <div className="tap">
                        <p className="tap-head bold">Total</p>
                        <p className="tap-price bold"><span className="pound">&#163;</span>{tap.toString().slice(0, 6)}</p>
                        <p className="tap-footer">all passengers</p>
                    </div>
                ) : []}
            </section>
        );
    }
}

export default Fares;
