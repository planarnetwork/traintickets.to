import classes from './Calendar.scss'
import range from 'lodash/range'
import chunk from 'lodash/chunk'
import Day from './day/Day'

export default class Calendar extends React.Component {
  selectDate(i, w) {
    const prevMonth = (w === 0 && i > 7),
          nextMonth = (w >= 4 && i <= 14),
          m = this.props.moment;

    m.date(i);
    if(prevMonth) m.subtract(1, 'month');
    if(nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  }

  prevMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  }

  nextMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  }

  render() {
    const m = this.props.moment,
          d = m.date(),
          d1 = m.clone().subtract(1, 'month').endOf('month').date(),
          d2 = m.clone().date(1).day(),
          d3 = m.clone().endOf('month').date(),
          days = [].concat(
            range(d1-d2+1, d1+1),
            range(1, d3+1),
            range(1, 42-d3-d2+1)
          ),
          weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className={classnames(classes.calendar, this.props.className)}>
        <div className={classes.toolbar}>
          <button type="button" className={classes.prevMonth} onClick={::this.prevMonth}>
            <i className={classes.prevMonthIcon}/>
          </button>
          <span className={classes.currentDate} >{m.format('MMMM YYYY')}</span>
          <button type="button" className={classes.nextMonth} onClick={::this.nextMonth}>
            <i className={classes.nextMonthIcon}/>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) => (
              <tr key={w}>
                {row.map((i) => (
                  <Day key={i} i={i} d={d} w={w}
                    onClick={this.selectDate.bind(this, i, w)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
