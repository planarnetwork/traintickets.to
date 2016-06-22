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
    directions: React.PropTypes.any.isRequired,
    expandDirection: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.string.isRequired,
    locations: React.PropTypes.array.isRequired
  };

  toggle() {
    this.setState({ expanded: !this.state.expanded })
  }

  setTopOffset(value) {
    this.refs.directionsBody.scrollTop = value;
  }

  getDirectionsBodyTopOffset() {
    return this.refs.directionsBody.getBoundingClientRect().top;
  }

  renderDirections() {
    const { loading, directions, locations, expandDirection, expanded } = this.props;

    const directionComponents = _.map(directions, (x, i) => (
      <Direction
        ref={'direction' + i}
        key={i}
        direction={x}
        locations={locations}
        expand={_.partial(expandDirection, i)}
        expanded={ i == (expanded * 1) }
        setTopOffset={::this.setTopOffset}
        getDirectionsBodyTopOffset={::this.getDirectionsBodyTopOffset} />
    ), this);

    return (
      <section ref="directionsBody" className={classes.directionsBody} >
        { loading ? (
          <figure className={classes.directionsLoadingIndicator}>
            <LoadingIndicator />
          </figure>
        ) : directionComponents }
      </section>
    )
  }

  render() {
    const { className, loading, locations, directions, expanded, expandDirection } = this.props;

    return (
      <div className={classnames(className, classes.directions, {[classes.directionsCollapsed]: !this.state.expanded})}>
        <section className={classes.header} onClick={::this.toggle}>
          <h2>Directions</h2>
          <CustomIcon
            className={classnames(classes.expandIcon, { [classes.expandIconDown]: this.state.expanded })}
            name="chevron-right" />
        </section>
        { this.renderDirections() }
      </div>
    )
  }
}
