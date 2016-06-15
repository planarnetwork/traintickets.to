import classes from './TubeLeg.scss';

import LegIcon from 'components/controls/leg-icon/LegIcon';
import { LocationsHelper, DateTimeHelper } from 'utils'

export default class TubeLeg extends React.Component {
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
      <section className={(className || '') + ' ' + classes.tubeLeg}>
        <LegIcon mode="tube" />
        <div className={classes.text} >
          <span>{formattedDuration}</span> by tube to <span>{stationName}</span>
        </div>
      </section>
    )
  }
}
