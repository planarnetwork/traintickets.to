import classes from './Direction.scss'
import TrainLeg from './legs/train/TrainLeg'
import WalkLeg from './legs/walk/WalkLeg'
import TubeLeg from './legs/tube/TubeLeg'
import MetroLeg from './legs/metro/MetroLeg'
import BusLeg from './legs/bus/BusLeg'
import CustomIcon from 'components/controls/icon/CustomIcon'
import ExpandTransition from 'components/transitions/expand-transition/ExpandTransition'
import { DateTimeHelper } from 'utils'

export default class Direction extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    direction: React.PropTypes.object.isRequired,
    expand: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    locations: React.PropTypes.array.isRequired
  };

  renderLeg(leg, index) {
    switch (leg.mode) {
      case 'train':
        return ( <TrainLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
      case 'walk':
        return ( <WalkLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
      case 'tube':
        return ( <TubeLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
      case 'bus':
        return ( <BusLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
      case 'metro':
        return ( <MetroLeg className={classes.leg} key={index} locations={this.props.locations} {...leg} /> )
      default:
        return null
    }
  }

  showAll() {
    this.setState({ showAll: true });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.expanded && nextProps.expanded) {
      this.setState({ showAll: false });
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
        <section className={classes.header} onClick={expand} >
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
          <ExpandTransition
            component="section"
            className={''} >

            { expanded && (
              <section>
                {legs}
              </section>
            )}

          </ExpandTransition>
        </div>
      </section>
    )
  }
}
