import {SearchQuery} from "../../component/Search/SearchContext";
import {AxiosInstance} from "axios";
import autobind from "autobind-decorator";
import {isArray} from "util";

@autobind
export class JourneyPlanner {

  constructor(
    private readonly client: AxiosInstance
  ) {}

  public async search(params: SearchQuery): Promise<SearchResults | ErrorResponse> {
    try {
      const results = await this.client.get<JourneyPlannerResponse>("/jp", { params });
      const handler = new ResponseHandler(results.data);

      return handler.getFares();
    }
    catch (error) {
      return { error };
    }
  };

}

class ResponseHandler {

  constructor(
    private readonly data: JourneyPlannerResponse
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

export interface Leg {
  origin: string;
  destination: string;
  mode: string;
  operator: string;
  service: string;
  type: "timetable" | "fixed";
  callingPoints: CallingPoint[];
}

export interface CallingPoint {
  station: string;
  arrive: number | null;
  depart: number | null;
}

interface SingleJourneyFares {
  price: number;
}

interface ReturnJourneyFares extends SingleJourneyFares {
  with: InwardOutwardCombination;
  cheapestInward: string;
}

interface PriceIndex {
  [inwardJourneyId: string]: number;
}

interface InwardOutwardCombination {
  [inwardJourneyId: string]: SingleJourneyFares;
}

interface FaresIndex {
  [outwardJourneyId: string]: SingleJourneyFares | ReturnJourneyFares;
}

export interface SearchResults {
  response: {
    outward: Journey[];
    inward: Journey[];
    fares: FaresIndex;
    cheapestOutward: string;
    cheapestInward: string;
  },
  links: any;
}

export interface ErrorResponse {
  error: any;
}