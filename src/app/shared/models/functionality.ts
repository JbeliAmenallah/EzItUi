import { Project } from "./project";
import { Resource } from "./resource";
import { Task } from "./task";

export interface Functionality {
    id?: number;
    functionalityName: string;
    descriptionFunctionality: string;
    priority: number;
    status: string;
    complexityLevel: string;
    startDate ?: Date;
    endDate: Date;
    previousTask?: number;
    nextTask?: number;
    parentTask?: string;
    projectId: number;
    project?: Project; 
    numberOfDaysWorked?: number;
    duration: number;
    numberOfHoursWorked?: number;
    realDuration?: number;
    resources?: Resource[];
    tasks?: Task[]; 
    validationCriteria?: string[];

}
