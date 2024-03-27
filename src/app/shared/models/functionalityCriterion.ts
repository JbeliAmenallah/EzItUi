// FunctionalityCriterion
import { Bug } from "./bug";
import { Functionality } from "./functionality";

export interface FunctionalityCriterion {
    id?: number;
    description: string;
    functionalityId: number;
    bugs?: Bug[];
}
