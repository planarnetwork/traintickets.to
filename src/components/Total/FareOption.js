import React, {Component} from "react";
import './Total.css';


export default class FareOption extends Component {

  render() {
    console.log(this.props);
    return (
      <table>
        <tbody>
        {
          this.props.fares.map(fare =>
            <tr key={fare}>
              <td>{this.props.links[fare.fare].origin}</td>
              <td>{this.props.links[fare.fare].destination}</td>
              <td>{this.props.links[fare.fare].route}</td>
              <td>{this.props.links[fare.fare].ticketType}</td>
              <td>{fare.adults}</td>
              <td>{fare.children}</td>
              <td><span className="pound">&#163;</span>{Math.floor(fare.price / 100)}<span className="pence">.{(fare.price % 100) === 0 ? (fare.price % 100) + '0' : (fare.price % 100)}</span></td>
            </tr>
          )
        }
        </tbody>
      </table>
    )
  }

}
