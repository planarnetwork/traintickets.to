import React, {Component} from "react";
import {Paper} from 'material-ui';
import locations from '../../data/locations.json';
import FullFares from '../FullFares/FullFaresContainer'
import TotalTable from  '../Total/TotalContainer';
import Loader from  '../Loader/LoaderContainer';
import './Fares.css';
import * as moment from "moment";

class Fares extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inwardPrice: 0,
            outwardPrice: 0,
            inwardDom: [],
            fullFaresStatus: false,
            totalStatus: false,
            outwardSelected: this.props.searchResult.outwardSelected,
            route: this.props.searchResult.response.outward.find(j => j.id === this.props.searchResult.outwardSelected),
        };

        this.handleFullFaresModal = this.handleFullFaresModal.bind(this);
        this.handleTotalModal = this.handleTotalModal.bind(this);
    }

    handleFullFaresModal(event, id, dir) {
        event.preventDefault();
        const direction = dir === 'out' ? 'outward' : 'inward';

        this.setState({
            fullFaresStatus: !this.state.fullFaresStatus,
            route: this.props.searchResult.response[direction].find(j => j.id === id),
        });
    }

    handleTotalModal(event) {
        event.preventDefault();

        this.setState({
            totalStatus: !this.state.totalStatus,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
          inwardPrice: 0,
          outwardPrice: 0,
          inwardDom: [],
          route: [],
          fullFaresStatus: false,
          totalStatus: false,
          outwardSelected: props.searchResult.outwardSelected,
        });
    }

    render() {
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

        return (
            <section className="fares">
                {this.props.searchResult.response.inward || this.props.searchResult.response.outward ? (
                <div className="container">
                    {this.props.loading ? (<Loader />) : []}
                    <div className="fares-out clearfix">
                        <h3 className="fares-title bold">{origin ? 'OUTBOUND - ' + origin : ''}{destination ? ' to ' + destination : ''}</h3>
                        {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.outward, 'out', fares, this.state.outwardSelected)}
                    </div>
                    {this.props.searchResult.response.inward.length > 0 ? (
                        <div className="fares-return clearfix">
                            <h3 className="fares-title bold">{destination ? 'RETURN - ' + destination : ''}{origin ? ' to ' + origin: ''}</h3>
                            {this.props.searchResult.response.length ? 'No results' : this.getCarosel(this.props.searchResult.response.inward, 'inw', fares[this.state.outwardSelected] ? fares[this.state.outwardSelected].with : 0, this.state.inwardSelected)}
                        </div>
                    ) : []}
                </div>
                ) : []}
                {this.state.inwardPrice > 0 || this.state.outwardPrice || this.props.outwardPrice > 0 ? (
                    <div className="tap" onClick={(event) => {
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
      return (<div className="fare-container">
        {journeys.map(journey => {
          let price = fares[journey.id] !== undefined ? fares[journey.id].price : 0;
          let pence;

            if(price === 0) {
                pence = '--'
            } else if((price % 100) === 0) {
                pence = (price % 100) + '0'
            } else {
                pence = (price % 100) < 10 ? "0" + price % 100 : price % 100;
            }

            
          return (
            <Paper key={journey.id} className="fare" zDepth={2}>
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">{journey.origin}</span>
                  <span className="fare-station pull-right">{journey.destination}</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">{moment.unix(journey.departureTime).utc().format(moment.HTML5_FMT.TIME)}</time>
                  <time className="fare-time pull-right">{moment.unix(journey.arrivalTime).utc().format(moment.HTML5_FMT.TIME)}</time>
                </div>
                <p className="duration">{moment.unix(journey.arrivalTime - journey.departureTime).utc().format("H[hrs] m[min]")}</p>
                <p className="fare-ticket"><span onClick={(event) => {
                    this.handleFullFaresModal(event, journey.id, direction);
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
      </div>);
    }

    selectJourney(price, journeyId, direction) {
      if(direction === 'out') {
        this.setState({
          outwardPrice: price,
          outwardSelected: journeyId,
          inwardDom: this.props.searchResult.fares[journeyId].with || 0,
        });
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
