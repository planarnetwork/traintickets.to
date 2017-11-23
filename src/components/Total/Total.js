import React, {Component} from "react";
import locations from '../../data/locations.json';
import './Total.css';


class Total extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        console.log(this.props.routeFull)
        return (
            <div className="ff-modal">
                <div className="ff-list">
                    <a className="ff-close" href="" onClick={(event) => this.props.handleTotalModal(event)}><i className="fa fa-times-circle" aria-hidden="true"></i></a>
                    <div className="ff-element">
                        <h2>Origin code</h2>
                        <p>{this.props.origin.code}</p>
                    </div>
                    <div className="ff-element">
                        <h2>Destination code</h2>
                        <p>{this.props.destination.code}</p>
                    </div>
                    <div className="ff-element rout-element">
                        <h2>Route code</h2>
                        <p>1</p>
                    </div>
                    <div className="ff-element">
                        <h2>Ticket code</h2>
                        <p>1</p>
                    </div>
                    <div className="ff-element">
                        <h2>Railcard code</h2>
                        <p>Ticket Type</p>
                    </div>
                    <div className="ff-element">
                        <h2>{this.props.adults > 1 ? 'Adults' : 'Adult'}</h2>
                        <p>{this.props.adults}</p>
                    </div>
                    <div className="ff-element">
                        <h2>Children</h2>
                        <p>{this.props.children}</p>
                    </div>
                    <div className="ff-element">
                        <h2>Price</h2>
                        <p><span className="pound">&#163;</span>{Math.floor(this.props.tap / 100)}<span className="pence">.{(this.props.tap % 100) === 0 ? (this.props.tap % 100) + '0' : (this.props.tap % 100)}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Total;
