import {Location, locations} from "./locations";
import {Railcard, railcards} from "./railcards";

const dev = {
  journeyPlannerUrl: "http://localhost:8002/",
  orderServiceUrl: "http://localhost:8002/",
  locations,
  railcards
};

const production = Object.assign({}, dev, {
  journeyPlannerUrl: "https://traintickets.to/",
  orderServiceUrl: "https://traintickets.to/"
});

export interface Config {
  journeyPlannerUrl: string;
  orderServiceUrl: string;
  locations: Location[];
  railcards: Railcard[];
}

export const config: Config = process.env.REACT_APP_ENV === "dev" ? dev : production;
