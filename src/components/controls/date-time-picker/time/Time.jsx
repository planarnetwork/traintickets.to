import classes from './Time.scss'
import InputSlider from 'react-input-slider'

export default class Time extends React.Component {
  changeHours(pos) {
    let m = this.props.moment;
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  }

  changeMinutes(pos) {
    let m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }

  render() {
    const m = this.props.moment;

    return (
      <div className={classnames(classes.timePicker, this.props.className)}>
        <div className={classes.showtime}>
          <span className={classes.time}>{m.format('HH')}</span>
          <span className={classes.separater}>:</span>
          <span className={classes.time}>{m.format('mm')}</span>
        </div>

        <div className={classes.sliders}>
          <div className={classes.timeText}>Hours:</div>
          <InputSlider
            className={classes.sliderTime}
            xmin={0}
            xmax={23}
            x={m.hours()}
            onChange={::this.changeHours}
          />
        <div className={classes.timeText}>Minutes:</div>
          <InputSlider
            className={classes.sliderTime}
            xmin={0}
            xmax={59}
            x={m.minute()}
            onChange={::this.changeMinutes}
          />
        </div>
      </div>
    );
  }
}
