import classes from './Directions.scss';
import { CustomIcon } from 'components'
import Direction from './direction/Direction'
import { DataBindingHelper } from 'utils'
import LoadingIndicator from 'components/controls/loading-indicator/LoadingIndicator'

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
    expanded: React.PropTypes.string.isRequired,
    locations: React.PropTypes.array.isRequired
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
    const { className, loading, locations, directions, expanded, expandDirection } = this.props;

    const directionComponents = _.map(directions, (x, i) => (
      <Direction
        key={i}
        direction={x}
        locations={locations}
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
        <section className={classes.directionsBody} style={{ display: this.state.expanded ? 'block' : 'none' }}>
          { loading ? (
            <figure className={classes.directionsLoadingIndicator}>
              <LoadingIndicator />
            </figure>
          ) : directionComponents }
        </section>
      </section>
    )
  }
}
