import classes from './DateTimePicker.scss'
import Calendar from './calendar/Calendar'
import Time from './time/Time';

export default class DateTimePicker extends React.Component {
  state = {
    tab: 0
  };

  handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({tab: tab});
  }

  render() {
    const tab = this.state.tab,
          m = this.props.moment;

    return (
      <div className={classnames(classes.dateTimePicker, this.props.className)} style={this.props.style} >
        <div className={classes.options} >
          <button
            type="button"
            className={classnames('ion-calendar', classes.btn, {[classes.optionsActive]: tab === 0})}
            onClick={this.handleClickTab.bind(this, 0)} >
            Date
          </button>
          <button
            type="button"
            className={classnames('ion-clock', classes.btn, {[classes.optionsActive]: tab === 1})}
            onClick={this.handleClickTab.bind(this, 1)} >
            Time
          </button>
        </div>

        <div className={classes.tabs} >
          <Calendar
            className={classnames(classes.tab, {[classes.tabActive]: tab === 0})}
            moment={m}
            onChange={this.props.onChange}
          />
          <Time
            className={classnames(classes.tab, {[classes.tabActive]: tab === 1})}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>

        <button type="button" className={classnames(classes.btn, classes.btnSave)}
          onClick={() => this.props.hideDatePicker()}>
          Done
        </button>
      </div>
    );
  }
}
