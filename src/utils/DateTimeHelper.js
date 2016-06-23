import appConfig from 'app.config'

export default class DateTimeHelper {
  static parseTime(str) {
    return moment(str, appConfig.serverTimeFormat).format(appConfig.uiTimeFormat);
  }
  
  static getDuration(date1, date2) {
    const d1 = moment(date1, appConfig.serverTimeFormat);
    const d2 = moment(date2, appConfig.serverTimeFormat);

    if (d1.isAfter(d2)) {
      d2.add(1, "days");
    }

    return moment.duration(d2.diff(d1)).format(appConfig.uiDurationFormat);
  }

  static parseDuration(str) {
    return moment.duration(str).format(appConfig.uiDurationFormat);
  }
}
