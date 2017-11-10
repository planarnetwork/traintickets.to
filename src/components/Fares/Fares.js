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
            outwardPrice: 0,
            inwardPrice: 0
        };
    }

    componentWillReceiveProps() {
        this.setState({
            outwardPrice: 0,
            inwardPrice: 0
        });
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

        const fares = this.getFares();

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

    getCarosel(journeys, direction, fares, selectedId) {
      return (<OwlCarousel ref={"fares-" +direction} options={options}>
        {journeys.map(journey => {
          const price = fares[journey.id].price;

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
                <p className="fare-ticket">Ticket type</p>
                <div className="fare-bottom">
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>{Math.floor(price / 100)}<span className="pence">.{(price % 100)}</span>
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
            .map(f => f.totalPrice)
            .reduce((total, price) => total + price, 0);

          if (journeyPairTotal < cheapestInwardPrice) {
            cheapestInwardPrice = journeyPairTotal;
            cheapestInward = inwardJourneyId;
          }

          pairedJourneys[inwardJourneyId] = journeyPairTotal;
        }

        const result = { cheapestInward, price: cheapestInwardPrice, "with": {} };

        for (const inwardJourneyId in journey) {
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
