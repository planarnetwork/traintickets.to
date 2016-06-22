import classes from './Direction.scss'
import * as legComponents from './legs'
import TrainLeg from './legs/train/TrainLeg'
import WalkLeg from './legs/walk/WalkLeg'
import TubeLeg from './legs/tube/TubeLeg'
import MetroLeg from './legs/metro/MetroLeg'
import BusLeg from './legs/bus/BusLeg'
import TransferLeg from './legs/transfer/TransferLeg'
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
    // switch (leg.mode) {
    //   case 'train':
    //     return ( <TrainLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
    //   case 'walk':
    //     return ( <WalkLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
    //   case 'tube':
    //     return ( <TubeLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
    //   case 'bus':
    //     return ( <BusLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
    //   case 'metro':
    //     return ( <MetroLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
    //   case 'transfer':
    //     return ( <TransferLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
    //   default:
    //     return null
    // }
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

  renderModeIcons() {
    const { direction } = this.props;

    return _.map(_.take(direction.legs, 4), (x, i) => (
      <figure key={i} className={classes.headerIcon} >
        <CustomIcon  name={x.mode} />
      </figure>
    ), this);
  }

  render() {
    const { className, direction, expand, expanded, ...other } = this.props;

    const legs = _.map(direction.legs, this.renderLeg, this);

    return (
      <section className={(className || '') + ' ' + classes.direction}>
        <section className={classes.header} onClick={::this.expand} >
          <div className={classes.modeIcons}>
            {this.renderModeIcons()}
          </div>
          <CustomIcon
            className={classnames(classes.expandIcon, { [classes.expandIconDown]: expanded })}
            name="chevron-right" />
          {direction.legs.length > 4 && (<span className={classes.moreDots}>...</span>)}
          <h3 >{DateTimeHelper.parseTime(direction.departureTime)} - {DateTimeHelper.parseTime(direction.arrivalTime)}</h3>
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
