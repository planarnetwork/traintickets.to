import React, {Component} from "react";
import './Total.css';
import FareOption from "./FareOption";


export default class TotalTable extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="ff-modal">
                <div className="ff-list">
                    <a className="ff-close" href="" onClick={(event) => this.props.handleTotalModal(event)}><i className="fa fa-times-circle" aria-hidden="true"></i></a>
                    {
                      this.props.fares.map(fare => <FareOption key={fare} fares={this.props.links[fare].fares} links={this.props.links}/>)
                    }
                </div>
            </div>
        );
    }
}
