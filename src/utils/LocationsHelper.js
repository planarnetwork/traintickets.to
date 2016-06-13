export default class LocationsHelper {
  static getByCode(locations, code) {
    return _.find(locations, x => x.code.toLowerCase() === code.toLowerCase());
  }

  static getNameByCode(locations, code) {
    const item = this.getByCode(locations, code);

    if (!item) {
      return code;
    }

    return `${item.name} (${item.code})`
  }

  static getStringValue(location) {
    return `${location.name} (${location.code})`;
  }

  static find(locations, value) {
    if (_.isEmpty(value)) return [];

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : _.filter(locations, x =>
      x.name.toLowerCase().slice(0, inputLength) === inputValue ||
      x.code.toLowerCase().slice(0, inputLength) === inputValue ||
      this.getStringValue(x).toLowerCase().slice(0, inputLength) === inputValue,
      this);
  }

  static findClosestLocation(locations, lat, lon) {
    return _.min(locations, (x) => Math.abs(x.lat - lat) + Math.abs(x.lon - lon), this);
  }
}
