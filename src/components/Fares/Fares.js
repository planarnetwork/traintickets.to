import React, {Component} from "react";
import {Paper} from 'material-ui';
import OwlCarousel from 'react-owl-carousel2';
import locations from '../../data/locations.json';

import './Fares.css';

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
                            {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.outward)}
                        </ul>
                    </div>
                    <div className="fares-return">
                        <h3 className="fares-title bold">{destination ? 'RETURN - ' + destination : ''}{origin ? ' to ' + origin: ''}</h3>
                        <ul className="fare-list clearfix">
                            {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.inward)}

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

    getCarosel(journeys) {
      return (<OwlCarousel ref="fares-out" options={options}>
        {journeys.map((journey, ind) => {
          const firstDate = new Date("01/01/1970 " + journey.departureTime);
          const secondDate = new Date("01/01/1970 " + journey.arrivalTime);
          const difference = secondDate.getTime() - firstDate.getTime();
          const hours = Math.floor(difference / 3600000);
          const minutes = Math.floor(difference % 3600000 / 60000);
          const time = hours + ':' + minutes;
          const cheapestFareOption = this.getCheapestFareOptionFor(journey.id);
          const price = cheapestFareOption.totalPrice; //todo: blank return prices for inward journeys

          return (
            <Paper key={ind} className="fare pull-left" zDepth={2}>
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">{journey.origin}</span>
                  <span className="fare-station pull-right">{journey.destination}</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">{journey.departureTime}</time>
                  <time className="fare-time pull-right">{journey.arrivalTime}</time>
                </div>
                <p className="duration">{time} min</p>
                <p className="fare-ticket">Ticket type</p>
                <div className="fare-bottom">
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>{Math.floor(price / 100)}<span className="pence">.{(price % 100)}</span>
                  </p>
                  <input type="radio" className="radio" name="out" onClick={() => this.handleInwardPrice(price)} />
                  <span className="radio-custom"></span>
                </div>
              </label>
            </Paper>
          )
        })}
      </OwlCarousel>);
    }

    getCheapestFareOptionFor(journeyId) {
      let price = Number.MAX_SAFE_INTEGER;
      let cheapestFareOption;

      for (const journeys in this.props.searchResult.response.fares) {
        const indexOfJourney = journeys.indexOf(journeyId);
        if (indexOfJourney !== -1) {
          const fareIndex = indexOfJourney > 0 ? this.props.searchResult.response.fares[journeys].length -1 : 0;
          const fareOptionId = this.props.searchResult.response.fares[journeys][fareIndex];
          const fareOption = this.props.searchResult.links[fareOptionId];

          if (fareOption.totalPrice < price) {
            price = fareOption.totalPrice;
            cheapestFareOption = fareOption;
          }
        }
      }

      return cheapestFareOption;
    }
}

export default Fares;
