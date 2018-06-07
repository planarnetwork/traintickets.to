import {SearchQuery} from "../../component/Search/SearchContext";
import {Fare} from "../../component/Fares/Fares";
import {AxiosInstance} from "axios";
import autobind from "autobind-decorator";

@autobind
export class JourneyPlanner {

  constructor(
    private readonly client: AxiosInstance
  ) {}

  public async search(params: SearchQuery): Promise<SearchResults> {
    try {
      const results = await this.client.get("/jp", { params });

      console.log(results);

      return { fares: [] };
    }
    catch (error) {
      return { error };
    }
  };

}

export interface SearchResults {
  error?: any;
  fares?: Fare[];
}
