import axios from 'axios';
import config from '../config.json'
axios.defaults.baseURL = config.baseUrl;

// get all api data
export async function search(origin, destination, outwardDate, adults, children, returnDate, railcards, filClass, singles, returns, advance, offpeack, anytime) {
    let firstClass, standardClass;
    if(filClass === 'firstClass') {
        firstClass = true;
    } else if(filClass === 'standardClass') {
        standardClass = true;
    } else {
        firstClass = false;
        standardClass = false;
    }
    try {
        const search = await axios.get(`jp`, {
            params: {origin,destination,outwardDate,adults,children,returnDate,railcards,firstClass,standardClass,singles,returns,advance,offpeack,anytime}
        });

        return processResponse(search.data);
    } catch (e) {
        console.error(e);
    }
}

function processResponse(data) {

  function getFares() {
    const result = {};
    let cheapestOutwardJourneyPrice = Number.MAX_SAFE_INTEGER;
    let cheapestJourney;
    for (const journeyId in data.response.fares) {
      result[journeyId] = getJourneyFares(data.response.fares[journeyId]);

      if (result[journeyId].price < cheapestOutwardJourneyPrice) {
        cheapestOutwardJourneyPrice = result[journeyId].price;
        cheapestJourney = journeyId;
      }
    }

    data.outwardSelected = cheapestJourney;

    return result;
  }

  function getJourneyFares(journey) {
    // singles
    if (journey.length) {
      return { price: getFareOptions(journey[0]).totalPrice };
    }
    // returns
    else {
      let cheapestInwardPrice = Number.MAX_SAFE_INTEGER;
      let cheapestInward;
      const pairedJourneys = {};

      for (const inwardJourneyId in journey) {
        const journeyPairTotal = journey[inwardJourneyId]
          .map(fId => getFareOptions(fId))
          .map(f => f ? f.totalPrice : 0)
          .reduce((total, price) => total + price, 0);

        if (journeyPairTotal < cheapestInwardPrice) {
          cheapestInwardPrice = journeyPairTotal;
          cheapestInward = inwardJourneyId;
        }

        pairedJourneys[inwardJourneyId] = journeyPairTotal;
      }

      const result = { cheapestInward, price: cheapestInwardPrice, "with": {} };

      for (const inwardJourneyId in journey) {
        result.with[inwardJourneyId] = { price: pairedJourneys[inwardJourneyId] - cheapestInwardPrice };
      }

      return result;
    }
  }

  function getFareOptions(fareOptionId) {
    return data.links[fareOptionId];
  }

  data.fares = getFares();

  return data;
}