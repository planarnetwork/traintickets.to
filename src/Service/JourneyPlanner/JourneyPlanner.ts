import {EventEmitter} from "eventemitter3";
import {SearchQuery} from "../../Component/Search/SearchContext";

export class JourneyPlanner extends EventEmitter {

  public search = async (query: SearchQuery) => {

    console.log(query);
    this.emit("results", []);
  };

}
