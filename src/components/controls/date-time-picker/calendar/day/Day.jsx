import classes from './Day.scss'

export default class Day extends React.Component {
  render() {
    const { i, w } = this.props,
          prevMonth = (w === 0 && i > 7),
          nextMonth = (w >= 4 && i <= 14);

    var cn = classnames({
      [classes.prevMonth]: prevMonth,
      [classes.nextMonth]: nextMonth,
      [classes.currentDay]: !prevMonth && !nextMonth && (i === this.props.d)
    });

    return (
      <td className={cn} {...this.props}>{i}</td>
    );
  }
}
