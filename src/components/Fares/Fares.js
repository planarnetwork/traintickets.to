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
            inwardPrice: 0,
            outwardPrice: 0,
        };
        this.handleInwardPrice = this.handleInwardPrice.bind(this);
        this.handleOutwardPrice = this.handleOutwardPrice.bind(this);
    }

    async handleInwardPrice(val) {
        let data = await val;
        let self = await this;

        self.setState({
            inwardPrice: data,
        })
    }
    async handleOutwardPrice(val) {
        let data = await val;
        let self = await this;

        self.setState({
            outwardPrice: data,
        })
    }
    componentWillReceiveProps() {
        this.setState({
            inwardPrice: 0,
            outwardPrice: 0,
        })
    }

    render() {
        let tap = Number(this.state.inwardPrice * 100  + Number(this.state.outwardPrice * 100)) / 100;

        const options = {
            items: 8,
            nav: true,
            rewind: false,
            autoplay: false,
            autoWidth: false,
            margin: 20,
            mouseDrag: false,
            navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
        };
        let originFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.inward.map((key) => key.origin)[0] : undefined;
        });
        let destinationFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.inward.map((key) => key.destination)[0] : undefined;
        });
        let origin = originFound ? originFound.name : undefined;
        let destination = destinationFound ? destinationFound.name : undefined;

        console.log('update');

        return (
            <section className="fares">
                {this.props.searchResult.response.inward || this.props.searchResult.response.outward ? (
                <div className="container">
                    <div className="fares-out">
                        <h3 className="fares-title bold">{origin ? 'OUTBOUND - ' + origin : ''}{destination ? ' to ' + destination : ''}</h3>
                        <ul className="fare-list clearfix">
                            {this.props.searchResult.response.length ? '0 Result' : ''}
                            <OwlCarousel ref="fares-out" options={options}>
                                {this.props.searchResult.response.inward.map((key, ind) => {
                                    let price, result;
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
                                    result = hours + ':' + minuts;

                                    this.props.searchResult.response.outward.map((out) => {
                                        let temp = Object.keys(this.props.searchResult.response.fares).filter((k) => {
                                            return (k.indexOf(out.id) > -1) && (k.indexOf(key.id) > -1)
                                        }).map((key) => key);
                                        let value = this.props.searchResult.response.fares[temp];
                                        price = this.props.searchResult.links[value[0]];
                                        price = price.totalPrice / 100;
                                    });
                                    console.log('Inward - ' + key.id + ': ---------------------------------- PRICE: ' + price);

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
                                                        <span className="pound">&#163;</span>{price ? price.toString().match(/^\d+/g) : ''}<span className="pence">{price ? price.toString().match(/\.\d+/g) : ''}</span>
                                                    </p>
                                                    <input type="radio" className="radio" name="out" onClick={() => this.handleInwardPrice(price)} />
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
                            {this.props.searchResult.response.length ? '0 Result' : ''}
                            <OwlCarousel ref="fares-out" options={options} >
                                {this.props.searchResult.response.outward.map((key, ind) => {
                                    let price, result;

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
                                    result = hours + ':' + minuts;

                                    this.props.searchResult.response.inward.map((inw) => {
                                        let temp = Object.keys(this.props.searchResult.response.fares).filter((k) => {
                                            return (k.indexOf(inw.id) > -1) && (k.indexOf(key.id) > -1)
                                        }).map((key) => key);
                                        let value = this.props.searchResult.response.fares[temp];
                                        price = this.props.searchResult.links[value[1] || value[0]];
                                        price = price.totalPrice / 100;
                                    });
                                    console.log('Outward - ' + key.id + ': ---------------------------------- PRICE: ' + price);

                                    return (
                                        <Paper key={ind} className="fare pull-left" zDepth={2}>
                                            <label className="fare-input center" onClick={() => this.handleOutwardPrice(price)}>
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
                                                        <span className="pound">&#163;</span>{price ? price.toString().match(/^\d+/g) : ''}<span className="pence">{price ? price.toString().match(/\.\d+/g) : ''}</span>
                                                    </p>
                                                    <input type="radio" className="radio" name="return"/>
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
                {this.state.inwardPrice > 0 || this.state.outwardPrice > 0 ? (
                    <div className="tap">
                        <p className="tap-head bold">Total</p>
                        <p className="tap-price bold">
                            <span className="pound">&#163;</span>{tap.toString().match(/^\d+/g)}<span className="pence">{tap.toString().match(/\.\d+/g)}</span>
                        </p>
                        <p className="tap-footer">all passengers</p>
                    </div>
                ) : []}
            </section>
        );
    }
}

export default Fares;
