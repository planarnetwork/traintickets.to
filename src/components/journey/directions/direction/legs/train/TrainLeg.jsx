import classes from './TrainLeg.scss'
import LegIcon from 'components/controls/leg-icon/LegIcon'
import { LocationsHelper, DateTimeHelper } from 'utils'

export default class TrainLeg extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    callingPoints: React.PropTypes.array.isRequired,
    locations: React.PropTypes.array.isRequired
  };

  static tocs = {
      "AW": "Arriva Trains Wales",
      "CC": "c2c",
      "CH": "Chiltern Railways",
      "XC": "CrossCountry",
      "EM": "East Midland Trains",
      "GW": "Great Western Railway",
      "SR": "Scotrail",
      "GX": "Gatwick Express",
      "GC": "Grand Central Railway",
      "HC": "Heathrow Connect",
      "HX": "Heathrow Express",
      "HT": "Hull Trains",
      "IL": "Island Line",
      "LM": "London Midland",
      "LO": "London Overground",
      "LT": "London Underground",
      "ME": "Merseyrail",
      "LE": "National Express East Anglia",
      "GR": "Virgin Trains East Coast",
      "NT": "Northern",
      "SW": "South West Trains",
      "SE": "Southeastern",
      "SN": "Southern",
      "TL": "Thameslink Rail",
      "TP": "Transpennine Express",
      "VT": "Virgin Trains",
      "TW": "Tyne and Wear Metro",
      "GN": "Great Northern",
      "XR": "Crossrail",
      "CS": "Caledonian Sleeper",
  };
    
  type = "train";  

  renderCallingPoint(callingPoint, index) {
    return (
      <li className={classes.callingPoint} key={index} >
        <div className={classes.time} >{DateTimeHelper.parseTime(callingPoint.time)} </div>
        <div className={classes.station} >
          {LocationsHelper.getNameByCode(this.props.locations, callingPoint.station).substring(0, 31)}
        </div>
      </li>
    )
  }

  render() {
    const { className, callingPoints, operator, service, ...other } = this.props;
    const operatorName = TrainLeg.tocs[operator] ? TrainLeg.tocs[operator] : operator;

    return (
      <section className={classnames(classes.trainLeg, className)}>
        <p>{operatorName} ({service})</p>
        <LegIcon mode={this.type}/>
        <ul className={classes.callingPoints}>
          {_.map(callingPoints, this.renderCallingPoint, this)}
        </ul>
      </section>
    )
  }
}
