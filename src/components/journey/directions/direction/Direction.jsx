import classes from './Direction.scss';
import TrainLeg from './legs/train/TrainLeg';
import WalkLeg from './legs/walk/WalkLeg';
import TubeLeg from './legs/tube/TubeLeg';
import BusLeg from './legs/bus/BusLeg';
import CustomIcon from 'components/controls/icon/CustomIcon';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
      default:
        return null
    }
  }

  render() {
    const { className, direction, expand, expanded, ...other } = this.props;

    const legs = _.map(direction.legs, this.renderLeg, this);

    const modeIcons = _.map(direction.legs, (x, i) => (
      <figure key={i} className={classes.headerIcon} >
        <CustomIcon  name={x.mode} />
      </figure>
    ), this);

    return (
      <section className={(className || '') + ' ' + classes.direction}>
        <section className={classes.header}>
          <div className={classes.modeIcons}>
            {modeIcons}
          </div>
          <CustomIcon
            onClick={expand}
            className={classes.expandIcon}
            name={expanded ? 'chevron-down' : 'chevron-right' } />
          <h3 >{direction.departureTime} - {direction.arrivalTime}</h3>
        </section>

        <div className={classes.directionsBodyContainer}>
          <ReactCSSTransitionGroup
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionName={classes}
            component="section"
            className={classes.directionBody} >

            { expanded && (
              <section>
                {legs}
              </section>
            )}

          </ReactCSSTransitionGroup>
        </div>
      </section>
    )
  }
}
