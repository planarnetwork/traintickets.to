import {Location, locations} from "./locations";
import {Railcard, railcards} from "./railcards";

export const dev: Config = {
  journeyPlannerUrl: "http://localhost:8002/",
  orderServiceUrl: "http://localhost:8002/",
  locations,
  railcards
};

export const production: Config = Object.assign({}, dev, {
  journeyPlannerUrl: "https://journey-planner.traintickets.to/",
  orderServiceUrl: "https://journey-planner.traintickets.to/"
});

export interface Config {
  journeyPlannerUrl: string;
  orderServiceUrl: string;
  locations: Location[];
  railcards: Railcard[];
}
