import classes from './Directions.scss';
import { BlockCentered, JourneyForm } from 'components'
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
    directionsRequest: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const { loaded, loading, directionsRequest } = this.props;

    if (!loaded && !loading) {
      directionsRequest();
    }
  }

  render() {
    const { className, locations, directions, ...other } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.directions}>
      </section>
    )
  }
}
