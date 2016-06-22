import classes from './TransferLeg.scss';

import LegIcon from 'components/controls/leg-icon/LegIcon';
import { LocationsHelper, DateTimeHelper } from 'utils'

export default class TransferLeg extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    origin: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    duration: React.PropTypes.string.isRequired,
    locations: React.PropTypes.array.isRequired
  };

  render() {
    const { className, origin, destination, duration, locations } = this.props;

    const formattedDuration = DateTimeHelper.parseDuration(duration);
    const stationName = LocationsHelper.getNameByCode(locations, destination);

    return (
      <section className={classnames(classes.transferLeg, className)}>
        <LegIcon mode="walk" />
        <div className={classes.text} >
          Transfer to <span>{stationName}</span>, <span>{formattedDuration}</span>
        </div>
      </section>
    )
  }
}
