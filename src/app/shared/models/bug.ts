import { FunctionalityCriterion } from "./functionalityCriterion";


export interface Bug {
    id?: number;
    description?: string;
    functionalityCriterionIds? : FunctionalityCriterion[];
  }
  