import classes from './Direction.scss';
import { BlockCentered, JourneyForm } from 'components'
import { DataBindingHelper } from 'utils'

import { Button, Col, Glyphicon } from 'react-bootstrap';

export default class Direction extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    direction: React.PropTypes.object.isRequired,
    expand: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool.isRequired
  };

  render() {
    const { className, direction, expand, expanded, ...other } = this.props;

    const legs = _.map(direction.legs, (x, i) => (
      <li key={i}>
        <div>{x.origin} - {x.destination}</div>
        <div>{x.duration}</div>
      </li>
    ), this);

    return (
      <li className={(className || '') + ' ' + classes.direction}>
        <header>
          <div className={classes.title} >{direction.departureTime} - {direction.arrivalTime}</div>
          <Glyphicon
            onClick={expand}
            className={classes.expandIcon}
            glyph={expanded ? 'chevron-down' : 'chevron-right' } />
        </header>
        <section style={{ display: expanded ? 'block' : 'none' }}>
          <ul>
            {legs}
          </ul>
        </section>
      </li>
    )
  }
}
