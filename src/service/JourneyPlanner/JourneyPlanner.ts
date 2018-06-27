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
    private readonly data: JourneyPlannerResponse,
    private readonly query: SearchState
  ) { }

  public getFares(): SearchResults {
    const fares: FaresIndex = {};
    let cheapestOutwardJourneyPrice = Number.MAX_SAFE_INTEGER;
    let cheapestOutward = "";
    let cheapestInward = "";

    for (const journeyId of Object.keys(this.data.response.fares)) {
      fares[journeyId] = isArray(this.data.response.fares[journeyId])
        ? this.getJourneyFaresForSingle(this.data.response.fares[journeyId] as string[])
        : this.getJourneyFares(this.data.response.fares[journeyId] as JourneyFareMap);

      if (fares[journeyId].price < cheapestOutwardJourneyPrice) {
        cheapestOutwardJourneyPrice = fares[journeyId].price;
        cheapestOutward = journeyId;
        cheapestInward = (fares[journeyId] as ReturnJourneyFares).cheapestInward || "";
      }
    }

    return {
      links: this.data.links,
      query: this.query,
      response: {
        outward: this.data.response.outward,
        inward: this.data.response.inward,
        fares,
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

  private getFareOptions(fareOptionId: string) {
    return this.data.links[fareOptionId];
  }
}

interface JourneyPlannerResponse {
  response: {
    outward: Journey[];
    inward: Journey[];
    fares: JourneyFareMap | ReturnJourneyFareMap;
  },
  links: {
    [id: string]: any;
  }
}

interface JourneyFareMap {
  [journeyId: string]: string[]; // fare option IDs
}

interface ReturnJourneyFareMap {
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
  legs: Leg[];
}

export type Leg = TimetableLeg | FixedLeg;

export interface TimetableLeg {
  type: "timetable";
  origin: string;
  destination: string;
  mode: string;
  operator: string;
  service: string;
  serviceDestination: string;
  callingPoints: CallingPoint[];
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
  response: {
    outward: Journey[];
    inward: Journey[];
    fares: FaresIndex;
    cheapestOutward: string;
    cheapestInward: string;
  },
  links: any;
}

export interface SearchResponse {
  error?: Error;
  results?: SearchResults;
}
