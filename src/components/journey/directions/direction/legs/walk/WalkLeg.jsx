import classes from './WalkLeg.scss';

import { Glyphicon } from 'react-bootstrap';

export default class WalkLeg extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    origin: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    duration: React.PropTypes.string.isRequired
  };

  render() {
    const { className, origin, destination, duration, ...other } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.walkLeg}>
        <div>{origin} - {destination}</div>
        <div>{duration}</div>
      </section>
    )
  }
}
