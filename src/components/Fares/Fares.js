import React, {Component} from "react";
import {Paper} from 'material-ui';
import OwlCarousel from 'react-owl-carousel2';
import locations from '../../data/locations.json';
import FullFares from '../FullFares/FullFaresContainer'
import TotalTable from  '../Total/TotalContainer';
import Loader from  '../Loader/LoaderContainer';
import './Fares.css';

const options = {
    items: 8,
    nav: true,
    rewind: false,
    autoplay: false,
    autoWidth: false,
    dotsEach: true,
    dotData: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
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
            fullFaresStatus: false,
            totalStatus: false,
            fullFaresPrice: 0,
            outwardSelected: this.props.searchResult.outwardSelected
        };

        this.handleFullFaresModal = this.handleFullFaresModal.bind(this);
        this.handleTotalModal = this.handleTotalModal.bind(this);
    }

    createRoute(id) {
        let data = this.props.searchResult.response.outward.filter((key) => {
            return key.id.indexOf(id ? id : this.props.route) > -1
        });
        this.setState({
            route: data,
        })
    }

    handleFullFaresModal(event, id, price) {
        event.preventDefault();
        this.createRoute(id);
        this.setState({
            fullFaresStatus: !this.state.fullFaresStatus,
            fullFaresPrice: price,
        });
    }
    handleTotalModal(event) {
        event.preventDefault();
        this.setState({
            totalStatus: !this.state.totalStatus,
        });
    }

    componentWillReceiveProps() {
        this.createRoute();
        this.setState({
            inwardPrice: 0,
            outwardPrice: 0,
            inwardDom: [],
        });
    }
    componentDidMount() {
        this.setState({loading: false})
    }

    render() {
        let self = this;
        let tap = Number(this.state.outwardPrice !== 0 ? this.state.outwardPrice : this.props.outwardPrice) + Number(this.state.inwardPrice);
        let originFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.outward.map((key) => key.origin)[0] : undefined;
        });
        let destinationFound = locations.find((e) => {
            return this.props.searchResult.response ? e.code === this.props.searchResult.response.outward.map((key) => key.destination)[0] : undefined;
        });
        let origin = originFound ? originFound.name : undefined;
        let destination = destinationFound ? destinationFound.name : undefined;

        const fares = this.props.searchResult.fares;

        // why is this hardcoded?
        setTimeout(function () {
            self.props.rebaseData('loading', false);
        }, 1000);

        if (!fares[this.state.outwardSelected]) {
          console.log(this.state.outwardSelected, fares);
        }
        return (
            <section className="fares">
                {this.props.searchResult.response.inward || this.props.searchResult.response.outward ? (
                <div className="container">
                    {this.props.loading ? (<Loader />) : []}
                    <div className="fares-out">
                        <h3 className="fares-title bold">{origin ? 'OUTBOUND - ' + origin : ''}{destination ? ' to ' + destination : ''}</h3>
                        <ul className="fare-list clearfix">
                            {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.outward, 'out', fares, this.state.outwardSelected)}
                        </ul>
                    </div>
                    {this.props.searchResult.response.inward.length > 0 ? (
                        <div className="fares-return">
                            <h3 className="fares-title bold">{destination ? 'RETURN - ' + destination : ''}{origin ? ' to ' + origin: ''}</h3>
                            <ul className="fare-list clearfix">
                                {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.inward, 'inw', fares[this.state.outwardSelected] ? fares[this.state.outwardSelected].with : 0, this.state.inwardSelected)}
                            </ul>
                        </div>
                    ) : []}
                </div>
                ) : []}
                {this.state.inwardPrice > 0 || this.state.outwardPrice || this.props.outwardPrice > 0 ? (
                    <div className="tap" onClick={(event) => {
                        if(!this.state.route.length) {
                            this.createRoute();
                        }
                        this.handleTotalModal(event);
                    }}>
                        <p className="tap-head bold">Total</p>
                        <p className="tap-price bold">
                            <span className="pound">&#163;</span>
                            {Math.floor(tap / 100)}
                            <span className="pence">.{(tap % 100) === 0 ? (tap % 100) + '0' : (tap % 100)}</span>
                        </p>
                        <p className="tap-footer">all passengers</p>
                    </div>
                ) : []}
                {this.state.fullFaresStatus === true ? (
                    <FullFares
                        key='tap-modal'
                        routeFull={this.state.route}
                        fullFaresPrice={this.state.fullFaresPrice}
                        origin={origin}
                        destination={destination}
                        handleFullFaresModal={this.handleFullFaresModal} />
                ) : []}
                {this.state.totalStatus === true ? (
                    <TotalTable
                        key='total-modal'
                        fares={this.props.searchResult.response.fares[this.state.outwardSelected][this.state.inwardSelected]}
                        links={this.props.searchResult.links}
                        handleTotalModal={this.handleTotalModal} />
                ) : []}
            </section>
        );
    }

    getCarosel(journeys, direction, fares, selectedId) {
      return (<OwlCarousel id="sync1" ref={"fares-" +direction} options={options}>
        {journeys.map(journey => {
          let price = fares[journey.id] !== undefined ? fares[journey.id].price : 0;
          let pence;

            // not sure what this was doing but doesn't look right
            // if(this.props.searchResult.response.inward.length > 1) {
            //     if(this.state.inwardDom[journey.id]) {
            //         price = this.state.inwardDom[journey.id].price;
            //     } else {
            //         price = fares[journey.id].price;
            //     }
            //     if(journey.id === selectedId) {
            //         this.props.rebaseData('outwardPrice', price);
            //         this.props.rebaseData('route', selectedId);
            //     }
            // }

            if(price === 0) {
                pence = '--'
            } else if((price % 100) === 0) {
                pence = (price % 100) + '0'
            } else {
                pence = (price % 100)
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
                <p className="fare-ticket"><span onClick={(event) => {
                    if(!this.state.route.length) {
                        this.createRoute();
                    }
                    this.handleFullFaresModal(event, journey.id, price);
                }}>More info</span></p>
                <div className="fare-bottom" onClick={() => this.selectJourney(price, journey.id, direction)}>
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>{price === 0 ? '-' : Math.floor(price / 100)}<span className="pence">.{pence}</span>
                  </p>
                  <input defaultChecked={journey.id === selectedId} type="radio" className="radio" name={direction} />
                  <span className="radio-custom"></span>
                </div>
              </label>
            </Paper>
          );
        })}
      </OwlCarousel>);
    }

    selectJourney(price, journeyId, direction) {
      if(direction === 'out') {
        if (!this.props.searchResult.fares[journeyId]) {
          console.log(this.props.searchResult.fares, journeyId);
        }
        this.setState({
          outwardPrice: price,
          outwardSelected: journeyId,
          inwardDom: this.props.searchResult.fares[journeyId].with || 0,
        });

        this.createRoute(journeyId);
      }
      else {
        this.setState({
          inwardPrice: price,
          inwardSelected: journeyId,
        });
      }
    }

}

export default Fares;
