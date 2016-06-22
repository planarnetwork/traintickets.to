import LocationsHelper from './LocationsHelper'

const DirectionsService = new google.maps.DirectionsService();

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

  static requestDirectionsFromGoogle(requestId, directionData, callback, getCurrentRequestId) {
    const travelMode =
      directionData.mode == 'walk' ?
      google.maps.TravelMode.WALKING :
      google.maps.TravelMode.TRANSIT;

    let transitOptions = {};

    if (directionData.mode == 'train' || directionData.mode == 'tube') {
      transitOptions.modes = [google.maps.TransitMode.TRAIN]
    }
    else if (directionData.mode == 'bus') {
      transitOptions.modes = [google.maps.TransitMode.BUS]
    }
    else if (directionData.mode == 'metro') {
      transitOptions.modes = [google.maps.TransitMode.SUBWAY]
    }

    const requestRoute = () => {
      if (getCurrentRequestId() != requestId) return;

      DirectionsService.route({
        origin: new google.maps.LatLng(directionData.origin.lat, directionData.origin.lon),
        destination: new google.maps.LatLng(directionData.destination.lat, directionData.destination.lon),
        travelMode: travelMode,
        transitOptions: transitOptions
      }, (result, status) => {

        if (getCurrentRequestId() != requestId) return;

        if (status === google.maps.DirectionsStatus.OK) {
          callback(directionData, result);
        }
        else {
          if (status == 'OVER_QUERY_LIMIT') {
            setTimeout(requestRoute, 100);
          }
          else {
            console.error(`error fetching directions ${ status }`);
          }
        }
      });
    }

    if (directionData.highlighted) {
      requestRoute();
    }
  }
}
