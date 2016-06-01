import classes from './Directions.scss';
import { BlockCentered, JourneyForm } from 'components'
import Direction from './direction/Direction'
import { DataBindingHelper } from 'utils'

import { Button, Col, Glyphicon } from 'react-bootstrap';

export default class Directions extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.any,
    directions: React.PropTypes.array.isRequired,
    directionsRequest: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.string.isRequired
  };

  componentWillMount() {
    const { loaded, loading, directionsRequest } = this.props;

    if (!loaded && !loading) {
      directionsRequest();
    }
  }

  render() {
    const { className, locations, directions, expanded, ...other } = this.props;

    const directionComponents = _.map(directions, (x, i) => (
      <Direction key={i} direction={x} expanded={ i == (expanded * 1) } />
    ), this);

    return (
      <section className={(className || '') + ' ' + classes.directions}>
        <ul>
          {directionComponents}
        </ul>
      </section>
    )
  }
}
