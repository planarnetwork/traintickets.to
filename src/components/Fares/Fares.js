import React, {Component} from "react";
import {Paper} from 'material-ui';
import OwlCarousel from 'react-owl-carousel2';
import locations from '../../data/locations.json';
import Tap from '../Tap/TapContainer'

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
            inwardPrice: 0,
            outwardPrice: 0,
            inwardDom: [],
            route: [],
            tapStatus: false,
        };
        this.handlePrice = this.handlePrice.bind(this);
        this.handleTapModal = this.handleTapModal.bind(this);
    }

    createRoute(id) {
        let data = this.props.searchResult.response.outward.filter((key) => {
            return key.id.indexOf(id ? id : this.props.route) > -1
        });
        this.setState({
            route: data,
        })
    }

    handleTapModal(event) {
        event.preventDefault();
        this.setState({
            tapStatus: !this.state.tapStatus,
        });
    }

    handlePrice(price, direction) {
        if(direction === 'inw') {
            this.setState({
                inwardPrice: price,
            })
        } else {
            this.setState({
                outwardPrice: price,
            })
        }
    }

    componentWillReceiveProps() {
        this.createRoute();
        this.setState({
            inwardPrice: 0,
            outwardPrice: 0,
            inwardDom: [],
        });
    }

    render() {
        let tap = Number(this.state.outwardPrice !== 0 ? this.state.outwardPrice : this.props.outwardPrice) + Number(this.state.inwardPrice);
        let originFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.inward.map((key) => key.origin)[0] : undefined;
        });
        let destinationFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.inward.map((key) => key.destination)[0] : undefined;
        });
        let origin = originFound ? originFound.name : undefined;
        let destination = destinationFound ? destinationFound.name : undefined;

        const fares = this.getFares();

        this.props.rebaseData('loading', false);

        return (
            <section className="fares">
                {this.props.searchResult.response.inward || this.props.searchResult.response.outward ? (
                <div className="container">
                    <div className="fares-out">
                        <h3 className="fares-title bold">{origin ? 'OUTBOUND - ' + origin : ''}{destination ? ' to ' + destination : ''}</h3>
                        <ul className="fare-list clearfix">
                            {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.outward, 'out', fares, this.outwardSelected)}
                        </ul>
                    </div>
                    <div className="fares-return">
                        <h3 className="fares-title bold">{destination ? 'RETURN - ' + destination : ''}{origin ? ' to ' + origin: ''}</h3>
                        <ul className="fare-list clearfix">
                            {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.inward, 'inw', fares[this.outwardSelected].with, this.inwardSelected)}
                        </ul>
                    </div>
                </div>
                ) : []}
                {this.state.inwardPrice > 0 || this.state.outwardPrice || this.props.outwardPrice > 0 ? (
                    <div className="tap" onClick={(event) => {
                        if(!this.state.route.length) {
                            this.createRoute();
                        }
                        this.handleTapModal(event);
                    }}>
                        <p className="tap-head bold">Total</p>
                        <p className="tap-price bold">
                            <span className="pound">&#163;</span>
                            {Math.floor(tap / 100)}
                            <span className="pence">.{(tap % 100)}</span>
                        </p>
                        <p className="tap-footer">all passengers</p>
                    </div>
                ) : []}
                {this.state.tapStatus === true ? (
                    <Tap
                        key='tap-modal'
                        tap={tap}
                        routeTaps={this.state.route}
                        origin={origin}
                        destination={destination}
                        handleTapModal={this.handleTapModal} />
                ) : []}
            </section>
        );
    }

    getCarosel(journeys, direction, fares, selectedId) {
      return (<OwlCarousel ref={"fares-" +direction} options={options}>
        {journeys.map(journey => {
          let price = fares[journey.id].price;

            if(this.state.inwardDom[journey.id]) {
                price = this.state.inwardDom[journey.id].price;
            } else {
                price = fares[journey.id].price;
            }
            if(journey.id === selectedId) {
                this.props.rebaseData('outwardPrice', price)
                this.props.rebaseData('route', selectedId)
            }

          return (
            <Paper key={journey.id} className="fare pull-left" zDepth={2}>
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">{journey.origin}</span>
                  <span className="fare-station pull-right">{journey.destination}</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">{journey.departureTime}</time>
                  <time className="fare-time pull-right">{journey.arrivalTime}</time>
                </div>
                <p className="duration">{journey.duration} min</p>
                <p className="fare-ticket" onClick={() => console.log('type')}>Ticket type</p>
                <div className="fare-bottom" onClick={() => {
                    if(direction === 'inw') {
                        this.handlePrice(price, direction);
                    } else {
                        this.createRoute(journey.id);
                        this.getNewFares(journey.id);
                        this.handlePrice(price, direction);
                    }
                }}>
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>{price === 0 ? '-' : Math.floor(price / 100)}<span className="pence">.{price === 0 ? '--' : (price % 100)}</span>
                  </p>
                  <input defaultChecked={journey.id === selectedId} type="radio" className="radio" name={direction} />
                  <span className="radio-custom"></span>
                </div>
              </label>
            </Paper>
          )
        })}
      </OwlCarousel>);
    }

    getNewFares(id) {
        const fares = this.getFares();
        this.setState({
            inwardDom: fares[id].with
        })
    }

    getFares() {
        const result = {};
        let cheapestOutwardJourneyPrice = Number.MAX_SAFE_INTEGER;
        let cheapestJourney;
        for (const journeyId in this.props.searchResult.response.fares) {
            result[journeyId] = this.getJourneyFares(this.props.searchResult.response.fares[journeyId]);

            if (result[journeyId].price < cheapestOutwardJourneyPrice) {
                cheapestOutwardJourneyPrice = result[journeyId].price;
                cheapestJourney = journeyId;
            }
        }

        this.outwardSelected = cheapestJourney;

        return result;
    }

    getJourneyFares(journey) {
      // singles
      if (journey.length) {
        return { price: this.getFareOptions(journey[0]).totalPrice };
      }
      // returns
      else {
        let cheapestInwardPrice = Number.MAX_SAFE_INTEGER;
        let cheapestInward;
        const pairedJourneys = {};

        for (const inwardJourneyId in journey) {
          const journeyPairTotal = journey[inwardJourneyId]
            .map(fId => this.getFareOptions(fId))
            .map(f => f.totalPrice ? f.totalPrice : 0)
            .reduce((total, price) => total + price, 0);

          if (journeyPairTotal < cheapestInwardPrice) {
            cheapestInwardPrice = journeyPairTotal;
            cheapestInward = inwardJourneyId;
          }

          pairedJourneys[inwardJourneyId] = journeyPairTotal;
        }

        const result = { cheapestInward, price: cheapestInwardPrice, "with": {} };

        for (const inwardJourneyId in journey) {
          // result.with[inwardJourneyId] = { price: pairedJourneys[inwardJourneyId] - Math.floor(Math.random() * 100) }; // Demo random price for inwards
          result.with[inwardJourneyId] = { price: pairedJourneys[inwardJourneyId] - cheapestInwardPrice };
        }

        return result;
      }
    }

    getFareOptions(fareOptionId) {
      return this.props.searchResult.links[fareOptionId];
    }
}

export default Fares;

// const fares = {
//   "/journey/1": {
//     "price": 1000,
//     "cheapestMatch": "/journey/2",
//     "with": {
//       "/journey/2": null,
//       "/journey/3": 500,
//     }
//   }
// };
