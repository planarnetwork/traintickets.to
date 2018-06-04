import {SearchQuery} from "../../Component/Search/SearchContext";
import {Fare} from "../../Component/Fares/Fares";

export class JourneyPlanner {

  public search = async (query: SearchQuery): Promise<SearchResults> => {
    return Promise.resolve([]);
  };

}

export type SearchResults = Fare[];