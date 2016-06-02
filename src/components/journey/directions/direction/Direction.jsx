import classes from './Direction.scss';
import TrainLeg from './legs/train/TrainLeg';
import WalkLeg from './legs/walk/WalkLeg';
import { CustomIcon } from 'components';

export default class Direction extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    direction: React.PropTypes.object.isRequired,
    expand: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool.isRequired
  };

  renderLeg(leg, index) {
    switch (leg.mode) {
      case 'train':
        return ( <TrainLeg key={index} {...leg} /> )
      case 'walk':
        return ( <WalkLeg key={index} {...leg} /> )
      default:
        return null
    }
  }

  render() {
    const { className, direction, expand, expanded, ...other } = this.props;

    const legs = _.map(direction.legs, this.renderLeg, this);

    return (
      <section className={(className || '') + ' ' + classes.direction}>
        <section className={classes.header}>
          <h3 >{direction.departureTime} - {direction.arrivalTime}</h3>
          <CustomIcon
            onClick={expand}
            className={classes.expandIcon}
            name={expanded ? 'chevron-down' : 'chevron-right' } />
        </section>
        <section style={{ display: expanded ? 'block' : 'none' }}>
          <section>
            {legs}
          </section>
        </section>
      </section>
    )
  }
}
