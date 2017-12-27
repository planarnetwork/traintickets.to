import React, {Component} from "react";
import './Total.css';


export default class FareOption extends Component {

  render() {
    return (
      <table className="clearfix">
        <thead>
        <tr>
          <td>Origin</td>
          <td>Destination</td>
          <td>Route Code</td>
          <td>Ticket Code</td>
          <td>Adults</td>
          <td>Children</td>
          <td>Price</td>
        </tr>
        </thead>
        <tbody>
        {
          this.props.fares.map((fare, i) => <FareUse links={this.props.links} fare={fare.fare} adults={fare.adults} children={fare.children} key={i}/>)
        }
        </tbody>
      </table>
    )
  }

}

function FareUse(props) {
    const price = props.links[props.fare].price;

    return (
        <tr>
            <td>{props.links[props.fare].origin}</td>
            <td>{props.links[props.fare].destination}</td>
            <td>{props.links[props.fare].route}</td>
            <td>{props.links[props.fare].ticketType}</td>
            <td>{props.adults}</td>
            <td>{props.children}</td>
            <td><span className="pound">&#163;</span>{Math.floor(price / 100)}<span className="pence">.{(price % 100) === 0 ? (price % 100) + '0' : (price % 100)}</span></td>
        </tr>);
}