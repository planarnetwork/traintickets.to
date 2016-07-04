import classes from './Direction.scss'
import * as legComponents from './legs'
import CustomIcon from 'components/controls/icon/CustomIcon'
import { DateTimeHelper } from 'utils'

export default class Direction extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    direction: React.PropTypes.object.isRequired,
    expand: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    locations: React.PropTypes.array.isRequired,
    setTopOffset: React.PropTypes.func.isRequired,
    getDirectionsBodyTopOffset: React.PropTypes.func.isRequired
  };

  renderLeg(leg, index) {
    return React.createElement(legComponents[leg.mode], {
      key: index,
      className: classes.leg,
      locations: this.props.locations,
      ...leg
    });
  }

  showAll() {
    this.setState({ showAll: true });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.expanded && nextProps.expanded) {
      this.setState({ showAll: false });
    }
  }

  expand() {
    const prevPosition = ReactDOM.findDOMNode(this).getBoundingClientRect().top - this.props.getDirectionsBodyTopOffset();
    this.setState({ prevPosition });
    this.props.expand();
  }

  componentDidUpdate() {
    if (this.props.expanded) {
      const newTopOffset = ReactDOM.findDOMNode(this).offsetTop - (this.state ? this.state.prevPosition : 0);
      this.props.setTopOffset(newTopOffset);
    }
  }
  
  render() {
    const { className, direction, expand, expanded, ...other } = this.props;

    const legs = _.map(direction.legs, this.renderLeg, this);

    return (
      <section className={(className || '') + ' ' + classes.direction}>
        <section className={classes.header} onClick={::this.expand} >
          <h3 >
            {DateTimeHelper.parseTime(direction.departureTime)} - {DateTimeHelper.parseTime(direction.arrivalTime)} (
            {DateTimeHelper.getDuration(direction.departureTime, direction.arrivalTime)}, { legs.length -1 } changes)
          </h3>

          <CustomIcon
            className={classnames(classes.expandIcon, { [classes.expandIconDown]: expanded })}
            name="chevron-right" />
        </section>

        <div className={classes.directionsBodyContainer}>
          {
            expanded && (
              <section>
                { legs }
              </section>
            )
          }
        </div>
      </section>
    )
  }
}
