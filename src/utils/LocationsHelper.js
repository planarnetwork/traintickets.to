export default class LocationsHelper {
  static getNameByCode(locations, code) {
    const item = _.find(locations, x => x.code.toLowerCase() == code.toLowerCase());

    if (!item) {
      return code;
    }

    return `${item.name} (${item.code})`
  }
}
