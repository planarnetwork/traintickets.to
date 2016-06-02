import classes from './Directions.scss';
import { CustomIcon } from 'components'
import Direction from './direction/Direction'
import { DataBindingHelper } from 'utils'

export default class Directions extends React.Component {
  constructor() {
    super();
  }

  state = {
    expanded: true
  };

  static propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.any,
    directions: React.PropTypes.array.isRequired,
    directionsRequest: React.PropTypes.func.isRequired,
    expandDirection: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.string.isRequired
  };

  toggle() {
    this.setState({ expanded: !this.state.expanded })
  }

  componentWillMount() {
    const { loaded, loading, directionsRequest } = this.props;

    if (!loaded && !loading) {
      directionsRequest();
    }
  }

  render() {
    const { className, locations, directions, expanded, expandDirection, ...other } = this.props;

    const directionComponents = _.map(directions, (x, i) => (
      <Direction
        key={i}
        direction={x}
        expand={_.partial(expandDirection, i)}
        expanded={ i == (expanded * 1) } />
    ), this);

    return (
      <section className={(className || '') + ' ' + classes.directions}>
        <section className={classes.header} onClick={::this.toggle}>
          <h2>Directions</h2>
          <CustomIcon
            className={classes.expandIcon}
            name={this.state.expanded ? 'chevron-down' : 'chevron-right' } />
        </section>
        <section style={{ display: this.state.expanded ? 'block' : 'none' }}>
          {directionComponents}
        </section>
      </section>
    )
  }
}
