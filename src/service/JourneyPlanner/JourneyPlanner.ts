import {AxiosInstance} from "axios";
import autobind from "autobind-decorator";
import {isArray} from "util";
import {SearchState} from "../../component/Search/Search";

@autobind
export class JourneyPlanner {

  constructor(
    private readonly client: AxiosInstance
  ) {}

  public async search(params: SearchState): Promise<SearchResponse> {
    let results;
    let error;

    try {
      const response = await this.client.get<JourneyPlannerResponse>("/jp", { params });
      const handler = new ResponseHandler(response.data, params);

      results = handler.getFares();
    }
    catch (err) {
      error = err;
    }

    return { results, error };
  };

}

class ResponseHandler {

  constructor(
    private readonly response: JourneyPlannerResponse,
    private readonly query: SearchState
  ) { }

  public getFares(): SearchResults {
    const prices: FaresIndex = {};
    let cheapestOutwardJourneyPrice = Number.MAX_SAFE_INTEGER;
    let cheapestOutward = "";
    let cheapestInward = "";

    for (const journeyId of Object.keys(this.response.data.fares)) {
      prices[journeyId] = isArray(this.response.data.fares[journeyId])
        ? this.getJourneyFaresForSingle(this.response.data.fares[journeyId] as string[])
        : this.getJourneyFares(this.response.data.fares[journeyId] as JourneyFareMap);

      if (prices[journeyId].price < cheapestOutwardJourneyPrice) {
        cheapestOutwardJourneyPrice = prices[journeyId].price;
        cheapestOutward = journeyId;
        cheapestInward = (prices[journeyId] as ReturnJourneyFares).cheapestInward || "";
      }
    }

    return {
      links: this.response.links,
      query: this.query,
      data: {
        outward: this.response.data.outward,
        inward: this.response.data.inward,
        fares: this.response.data.fares,
        prices,
        cheapestOutward,
        cheapestInward
      }
    };
  }

  private getJourneyFaresForSingle(journeyFares: string[]): SingleJourneyFares {
    return { price: this.getFareOptions(journeyFares[0]).totalPrice };
  }

  private getJourneyFares(journeyFares: JourneyFareMap): ReturnJourneyFares {
    const pairedJourneys: PriceIndex = {};
    let cheapestInwardPrice = Number.MAX_SAFE_INTEGER;
    let cheapestInward = "";

    for (const inwardJourneyId of Object.keys(journeyFares)) {
      const journeyPairTotal = journeyFares[inwardJourneyId]
        .map(fId => this.getFareOptions(fId))
        .map(f => f ? f.totalPrice : 0)
        .reduce((total, price) => total + price, 0);

      if (journeyPairTotal < cheapestInwardPrice) {
        cheapestInwardPrice = journeyPairTotal;
        cheapestInward = inwardJourneyId;
      }

      pairedJourneys[inwardJourneyId] = journeyPairTotal;
    }

    const result: ReturnJourneyFares = { cheapestInward, price: cheapestInwardPrice, "with": {} };

    for (const inwardJourneyId of Object.keys(journeyFares)) {
      result.with[inwardJourneyId] = { price: pairedJourneys[inwardJourneyId] - cheapestInwardPrice };
    }

    return result;
  }

  private getFareOptions(fareOptionId: string): FareOption {
    return this.response.links[fareOptionId];
  }
}

interface JourneyPlannerResponse {
  data: {
    outward: Journey[];
    inward: Journey[];
    fares: JourneyFareMap | ReturnJourneyFareMap;
  },
  links: {
    [id: string]: any;
  }
}

export interface JourneyFareMap {
  [journeyId: string]: string[]; // fare option IDs
}

export interface ReturnJourneyFareMap {
  [outwardJourneyId: string]: {
    [inwardJourneyId: string]: string[]; // fare option IDs
  }
}

export interface Journey {
  departureTime: number;
  arrivalTime: number;
  origin: string;
  destination: string;
  id: string;
  legs: string[];
}

export type Leg = TimetableLeg | FixedLeg;

export interface TimetableLeg {
  type: "timetabled";
  origin: string;
  destination: string;
  mode: string;
  operator: string;
  service: string;
  callingPoints: CallingPoint[];
}

export interface Service {
  trainUid: string,
  retailServiceId: string,
  destination: string
}

export interface FixedLeg {
  type: "fixed";
  origin: string;
  destination: string;
  mode: string;
  duration: number;
}

export interface CallingPoint {
  station: string;
  arrive: number | null;
  depart: number | null;
  platform: string;
}

export interface SingleJourneyFares {
  price: number;
}

export interface ReturnJourneyFares extends SingleJourneyFares {
  with: InwardOutwardCombination;
  cheapestInward: string;
}

interface PriceIndex {
  [inwardJourneyId: string]: number;
}

export interface InwardOutwardCombination {
  [inwardJourneyId: string]: SingleJourneyFares;
}

interface FaresIndex {
  [outwardJourneyId: string]: SingleJourneyFares | ReturnJourneyFares;
}

export interface SearchResults {
  query: SearchState;
  data: {
    outward: Journey[];
    inward: Journey[];
    fares: JourneyFareMap | ReturnJourneyFareMap;
    prices: FaresIndex;
    cheapestOutward: string;
    cheapestInward: string;
  },
  links: any;
}

export interface SearchResponse {
  error?: Error;
  results?: SearchResults;
}

export interface FareOption {
  totalPrice: number;
  fares: FareUse[];
}

export interface FareUse {
  adults: number;
  children: number;
  fare: string;
}

export interface Fare {
  origin: string;
  destination: string;
  route: string;
  price: number;
  railcard: string;
  restriction: string | null;
  ticketType: string;
}