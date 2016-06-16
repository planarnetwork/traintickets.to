import LocationsHelper from './LocationsHelper'

export default class DirectionsHelper {
  static iterateDirections(directions, locations, highlighted, iteratee) {
    _.each(directions, (journey, journeyIndex) => {
      const highlightedCurrent = journeyIndex == highlighted;

      _.each(journey.legs, (leg, legIndex) => {
        if (leg.mode == 'train') {
          _.each(leg.callingPoints, (callingPoint, callingPointIndex) => {
            if (callingPointIndex < leg.callingPoints.length - 1) {
              const directionData = this.getDirectionData(
                locations,
                callingPoint.station,
                leg.callingPoints[callingPointIndex + 1].station,
                highlightedCurrent,
                'train');

              if (directionData) {
                iteratee(directionData);
              }
            }
          })
        }
        else {
          const directionData = this.getDirectionData(
            locations,
            leg.origin,
            leg.destination,
            highlightedCurrent,
            leg.mode);

          if (directionData) {
            iteratee(directionData);
          }
        }
      })
    })
  }

  static getDirectionData(locations, origin, destination, highlighted, mode) {
    const originLocation = LocationsHelper.getByCode(locations, origin);
    const destinationLocation = LocationsHelper.getByCode(locations, destination);

    if (!originLocation || !destinationLocation) return null;

    return {
      origin: originLocation,
      destination: destinationLocation,
      highlighted,
      mode
    }
  }
}
