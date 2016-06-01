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
    expanded: React.PropTypes.bool.isRequired
  };

  render() {
    const { className, direction, ...other } = this.props;

    console.log(direction);

    return (
      <li className={(className || '') + ' ' + classes.direction}>
        aaaaaaa
      </li>
    )
  }
}
