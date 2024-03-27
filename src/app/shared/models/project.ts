import { Resource } from "./resource";

export interface Project {
    
    id ?: number ;
    projectName: string;
    description: string;
    startDate: Date;
    endDate: Date;
    estimatedDuration: number;
    resources ?: Resource [];
}
