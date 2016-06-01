import classes from './TrainLeg.scss';

import { Glyphicon } from 'react-bootstrap';

export default class TrainLeg extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    callingPoints: React.PropTypes.array.isRequired
  };

  renderCallingPoint(callingPoint, index) {
    return (
      <li key={index} >
        <div>{callingPoint.station}</div>
        <div>{callingPoint.time}</div>
      </li>
    )
  }

  render() {
    const { className, callingPoints, ...other } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.trainLeg}>
        <ul>
          {_.map(callingPoints, this.renderCallingPoint, this)}
        </ul>
      </section>
    )
  }
}
