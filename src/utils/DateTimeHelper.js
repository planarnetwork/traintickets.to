import appConfig from 'app.config'

export default class DateTimeHelper {
  static parseTime(str) {
    return moment(str, appConfig.serverTimeFormat).format(appConfig.uiTimeFormat);
  }

  static parseDuration(str) {
    return moment.duration(str).format(appConfig.uiDurationFormat);
  }
}
