import {Location, locations} from "./locations";
import {Railcard, railcards} from "./railcards";

export const dev: Config = {
  journeyPlannerUrl: "http://localhost:8002/",
  orderServiceUrl: "http://localhost:8002/",
  locations,
  railcards
};

export const production: Config = Object.assign({}, dev, {
  journeyPlannerUrl: "https://traintickets.to/",
  orderServiceUrl: "https://traintickets.to/"
});

export interface Config {
  journeyPlannerUrl: string;
  orderServiceUrl: string;
  locations: Location[];
  railcards: Railcard[];
}
