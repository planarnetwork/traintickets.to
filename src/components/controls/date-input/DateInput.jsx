import classes from './DateInput.scss'
import ValueLinkedComponent from 'components/controls/ValueLinkedComponent'
import DateTimePicker from 'components/controls/date-time-picker/DateTimePicker'
import PopupTransition from 'components/transitions/popup-transition/PopupTransition'

const dateFormat = "YYYY-MM-DD H:mm";

export default class DateInput extends ValueLinkedComponent {

  state = {
    datePickerVisible: false
  };

  showDatePicker = function() {
    document.addEventListener('click', this.hideDatePicker, true);
    this.setState({
      datePickerVisible: true
    });
  }.bind(this);

  hideDatePicker = function(e) {
    if (e) {
      let target = e.target;

      while (target != document) {
        if (target.classList.contains(classes.datePicker)) {
          return;
        }

        target = target.parentNode;
      }
    }

    document.removeEventListener('click', this.hideDatePicker, true);
    this.setState({
      datePickerVisible: false
    });
  }.bind(this);

  onChange(m) {
    this.props.onChange(m.format(dateFormat));
  }

  onSave() {
    debugger;
  }

  render() {
    const { value } = this.props,
          { datePickerVisible } = this.state;

    const momentValue = moment(value, dateFormat);

    return (
      <figure
        className={classes.dateInputContainer} >
        <input
          tabIndex="-1"
          type="text"
          className={classes.dateInput}
          value={value}
          onChange={() => null}
          onClick={this.showDatePicker}
          onFocus={this.showDatePicker} />
          <PopupTransition className="" component="div">
            { datePickerVisible && (
                <div className={classes.datePickerContainer} >
                    <DateTimePicker
                      style={{}}
                      className={classes.datePicker}
                      moment={momentValue}
                      hideDatePicker={this.hideDatePicker}
                      onChange={::this.onChange}
                      onSave={::this.onSave} />
                </div>
              )
            }
          </PopupTransition>
      </figure>
    )
  }
}
