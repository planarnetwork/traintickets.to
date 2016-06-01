import classes from './Journey.scss';
import { BlockCentered } from 'components'
import { DataBindingHelper } from 'utils'

import { Button, Col, Glyphicon } from 'react-bootstrap';

export default class Journey extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.any,
    directions: React.PropTypes.array.isRequired
  };

  componentWillMount() {
    const { loaded, loading, locationsRequest } = this.props;

    if (!loaded && !loading) {
      locationsRequest();
    }
  }

  render() {
    const { className, ...other } = this.props;

    return (
      <section className={(className || '') + ' ' + classes.journey}>

      </section>
    )
  }
}
